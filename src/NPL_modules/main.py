import init, modeling
import pickle
import json
import gensim
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.sequence import pad_sequences
from tensorflow.keras.models import load_model
import sys

def leanrn_new_data() :
    #procseesing new dataa
    X_train, y_train, vocab_size = init.data_processing()
    #learn new dataa
    modeling.create_model(X_train, y_train, vocab_size)
    return

def sentiment_predict(token, model):
    max_len = 30
    with open('NPL_modules/tokenizer.pickle', 'rb') as handle:
      tokenizer = pickle.load(handle)
    encoded = tokenizer.texts_to_sequences([token]) # 정수 인코딩
    pad_new = pad_sequences(encoded, maxlen = max_len) # 패딩
    score = float(model.predict(pad_new)) # 예측
    return score

def main(json_input):
    input = json.loads(json_input)
    
    stopwords = [line.rstrip() for line in open('../data/korStopWords.txt', 'r', encoding='UTF8')]
    userInfo = {"job":None, "hobby":None, "character":None,"region":None,"pn":[],}
    #userInfo['name'] = input['name']
    ##leanrn_new_data()

    #dataa
    pnModel = load_model('../data/learnedmodel/pnModel.h5')
    w2vModel = gensim.models.Word2Vec.load('../data/learnedmodel/w2vModel.bin')
    nounMap = {}
    positiveLine = 0
    negativeLine = 0
    neutralLine = 0

    for line in input['line']:
        # 토큰화
        okt = Okt()
        token = okt.morphs(line, stem=True)
        token = [word for word in token if not word in stopwords]
        nouns = okt.nouns(line)
        nouns = [word for word in nouns if not word in stopwords]
        # 토큰 저장
        for word in nouns :
            if word in nounMap:
                nounMap[word] += 1
            else:
                nounMap[word] = 1
        # 대화 분석
        pnResult = sentiment_predict(token, pnModel)
        if pnResult > 0.65 :
            positiveLine += 1
        elif pnResult < 0.35 :
            negativeLine += 1
        else :
            neutralLine += 1

    if max(positiveLine, negativeLine, neutralLine) == positiveLine:
        userInfo['pn'] = ['주로 긍정적 대화', positiveLine/ (positiveLine + negativeLine) * 100]
    elif max(positiveLine, negativeLine, neutralLine) == negativeLine:
        userInfo['pn'] = ['주로 부정적 대화', negativeLine / (positiveLine + negativeLine) * 100]
    elif max(positiveLine, negativeLine, neutralLine) == neutralLine:
        userInfo['pn'] = ['주로 중립적 대화', neutralLine / (positiveLine + negativeLine) * 100]
    print(json.dumps(input, ensure_ascii=False, indent="\t"))
    print('예상 PN : {0}, 비중 : {1:.2f}%'.format(userInfo['pn'][0], userInfo['pn'][1]))

    with open('../data/categories.txt', 'rb') as file:
        categories = pickle.load(file)

    # 토큰으로 카테고리 분석
    for category, list in categories.items():
        categorySimilar = [0]*len(list)
        categoryCount = [0]*len(list)
        mostFit = ['예측 실패', 0, False]
        for item in list:
            for noun, freq in nounMap.items():
                if item in w2vModel.wv.vocab and noun in w2vModel.wv.vocab :
                    result = w2vModel.wv.similarity(w1=item, w2=noun)
                    #print(item, noun, result)
                    if  result > 0.3:
                        index = list.index(item)
                        categorySimilar[index] += result
                        categoryCount[index] += 1

        index = categorySimilar.index(max(categorySimilar))
        if categoryCount[index] :
            userInfo[category] = mostFit[0] = list[index]
            mostFit[1] = int(categorySimilar[index] / categoryCount[index] * 100)
            if categoryCount[index] > 10:
                mostFit[2] = True

        print('예상 {0} : {1}, 평균 유사도 : {2}'.format(category, mostFit[0], mostFit[1]))

    print(json.dumps(userInfo, ensure_ascii=False, indent="\t"))
    return json.dumps(userInfo, ensure_ascii=False, indent="\t")


main('{"name": "문창주", ' \
           '"line": [' \
           '"컴퓨터가 고장나서 코딩 못했다.",' \
           '"머신러닝 이걸 왜한다고 해가지고",' \
           ' "파이썬 쉽다면서요", ' \
           '"새 키보드가 갖고 싶다", ' \
           '"하루종일 아무것도 안했다",' \
           '"아무것도 하기 싫다",' \
           '"나는 잘 모르겠다", ' \
           '"감정 분류가 잘안됩니다",' \
           '"어제 강남에서 곱창먹었음"]}')