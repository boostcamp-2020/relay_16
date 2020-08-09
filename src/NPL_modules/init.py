# -*- coding: utf-8 -*-

import pandas as pd
import pickle
import numpy as np
from konlpy.tag import Okt
from tensorflow.keras.preprocessing.text import Tokenizer
from tensorflow.keras.preprocessing.sequence import pad_sequences

def load_rowdata():
    train_data = pd.read_table('../data/ratings_train.txt')
    test_data = pd.read_table('../data/ratings_test.txt')
    stopwords = [line.rstrip() for line in open('../data/korStopWords.txt', 'r', encoding='UTF8')]
    print('# of train dataa : ', len(train_data))
    print('# of test dataa : ', len(train_data))
    print('# of test dataa : ', len(stopwords))
    return train_data, test_data, stopwords

def del_duplicated_data(train_data, test_data):
    train_data.drop_duplicates(subset=['document'], inplace=True)
    test_data.drop_duplicates(subset=['document'], inplace=True)
    return train_data, test_data

def del_null_data(train_data, test_data):
    train_data = train_data.dropna(how='any')
    test_data = test_data.dropna(how='any')
    print('isHasNull : ', train_data.isnull().values.any(), test_data.isnull().values.any())
    return train_data, test_data

def load_X_data(X_data):
    # remove stopwords
    for key, value in X_data.items():
        with open ('dataa/' + key + '.txt', 'rb') as file:
            X_data[key] = pickle.load(file)
    return X_data

def rewrite_X_file(X_data, train_data,test_data, stopwords) :
    okt = Okt()
    for key, value in X_data.items():
        if(key == 'X_train'):
            for sentence in train_data['document']:
                temp_X = okt.morphs(sentence, stem=True)  # 토큰화, stem : 일정 수준의 정규화 수행
                temp_X = [word for word in temp_X if not word in stopwords]  # 불용어 제거
                X_data[key].append(temp_X)
        else:
            for sentence in test_data['document']:
                temp_X = okt.morphs(sentence, stem=True)  # 토큰화, stem : 일정 수준의 정규화 수행
                temp_X = [word for word in temp_X if not word in stopwords]  # 불용어 제거
                X_data[key].append(temp_X)
        with open(key+'.txt', 'wb') as file:
            pickle.dump(X_data[key], file)
    print('X_data samples :')
    print(X_data['X_train'][:3])
    print(X_data['X_test'][:3])
    return X_data

def wirte_final_data_file(X_data, tokenizer) :
    for key, value in X_data.items():
        with open('dataa/'+ key +'_final.txt', 'wb') as file:
            pickle.dump(X_data[key], file)
    with open('tokenizer.pickle', 'wb') as handle:
        pickle.dump(tokenizer, handle, protocol=pickle.HIGHEST_PROTOCOL)
    return

def digit_encoding(X_train):
    tokenizer = Tokenizer()
    tokenizer.fit_on_texts(X_train)
    print('정수 인코딩 완료')
    print(tokenizer.word_index)
    return tokenizer

def del_rareWord(tokenizer, X_train):
    threshold = 3
    total_cnt = len(tokenizer.word_index)  # 단어의 수
    rare_cnt = 0  # 등장 빈도수가 threshold보다 작은 단어의 개수를 카운트
    total_freq = 0  # 훈련 데이터의 전체 단어 빈도수 총 합
    rare_freq = 0  # 등장 빈도수가 threshold보다 작은 단어의 등장 빈도수의 총 합
    # 단어와 빈도수의 쌍(pair)을 key와 value로 받는다.
    for key, value in tokenizer.word_counts.items():
        total_freq = total_freq + value
        # 단어의 등장 빈도수가 threshold보다 작으면
        if (value < threshold):
            rare_cnt = rare_cnt + 1
            rare_freq = rare_freq + value
    print('단어 집합(vocabulary)의 크기 :', total_cnt)
    print('등장 빈도가 %s번 이하인 희귀 단어의 수: %s' % (threshold - 1, rare_cnt))
    print("단어 집합에서 희귀 단어의 비율:", (rare_cnt / total_cnt) * 100)
    print("전체 등장 빈도에서 희귀 단어 등장 빈도 비율:", (rare_freq / total_freq) * 100)
    vocab_size = total_cnt - rare_cnt + 2
    tokenizer = Tokenizer(vocab_size, oov_token='OOV')
    tokenizer.fit_on_texts(X_train)
    return tokenizer, vocab_size

def below_threshold_len(max_len, nested_list):
    cnt = 0
    for s in nested_list:
        if (len(s) <= max_len):
            cnt = cnt + 1
    res = cnt / len(nested_list) * 100
    print('전체 sample 중 max_len(%s) 이하인 sample의 비율이 %.4f 입니다'%(max_len, res))

def data_processing():
    train_data, test_data, stopwords = load_rowdata()
    X_data = {"X_train": [], "X_test": []}
    y_data = {"y_train": [], "y_test": []}
    #del duplicated, null dataa
    train_data, test_data = del_duplicated_data(train_data, test_data)
    train_data, test_data = del_null_data(train_data, test_data)
    # load dataa if dataa exists
    X_data = load_X_data(X_data)
    # write dataa if not dataa exists
    #X_data = rewrite_X_file(X_data, train_data, test_data, stopwords)
    # 정수 인코딩
    tokenizer = digit_encoding(X_data['X_train'])
    tokenizer, vocab_size = del_rareWord(tokenizer, X_data['X_train'])
    # text 시퀀스 -> digit 시퀀스
    X_data['X_train'] = tokenizer.texts_to_sequences(X_data['X_train'])
    X_data['X_test'] = tokenizer.texts_to_sequences(X_data['X_test'])
    print('text 시퀀스 -> digit 시퀀스 확인')
    print(X_data['X_train'][:3])
    # set y_data
    y_data['y_train'] = np.array(train_data['label'])
    y_data['y_test'] = np.array(test_data['label'])
    # 빈도수 낮은 단어 삭제 후, empty sample 다시 제거
    drop_train = [index for index, sentence in enumerate(X_data['X_train']) if len(sentence) < 1]
    X_data['X_train'] = np.delete(X_data['X_train'], drop_train, axis=0)
    y_data['y_train'] = np.delete(y_data['y_train'], drop_train, axis=0)
    print('del empty sample')
    #padding
    max_len = 35
    below_threshold_len(max_len, X_data['X_train'])
    X_data['X_train'] = pad_sequences(X_data['X_train'], maxlen=max_len)
    X_data['X_test'] = pad_sequences(X_data['X_test'], maxlen=max_len)
    wirte_final_data_file(X_data, tokenizer)

    return X_data['X_train'], y_data['y_train'], vocab_size
