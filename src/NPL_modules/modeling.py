# -*- coding: utf-8 -*-

from tensorflow.keras.layers import Embedding, Dense, LSTM
from tensorflow.keras.models import Sequential
from tensorflow.keras.callbacks import EarlyStopping, ModelCheckpoint

def create_model(X_train, y_train, vocab_size):
    print('모델 생성')
    model = Sequential()
    model.add(Embedding(vocab_size, 100))
    model.add(LSTM(128))
    model.add(Dense(1, activation='sigmoid'))
    es = EarlyStopping(monitor='val_loss', mode='min', verbose=1, patience=4)
    mc = ModelCheckpoint('../data/learnedmodel/pnModel.h5', monitor='val_acc', mode='max', verbose=1, save_best_only=True)
    learn(model, X_train, y_train, es, mc)

def learn(model, X_train, y_train, es, mc):
    print('모델 학습 과정 설정...')
    model.compile(optimizer='rmsprop', loss='binary_crossentropy', metrics=['acc'])
    print('모델 학습...')
    history = model.fit(X_train, y_train, epochs=15, callbacks=[es, mc], batch_size=60, validation_split=0.2)
    save(model)

def save(model):
    print('모델 저장...')
    model.save('../data/learnedmodel/pnModel.h5')