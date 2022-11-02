type UserContextType = {
    user: string
    Login : (user: string) => void
    topics: Topic[]
}

enum UnderstandingLevel {
    WhatRubbish = 1,
    NotClear = 2,
    SomewhatUnderstood = 3,
    Understood = 4,
}

type Block = {
    understanding: UnderstandingLevel,
    text: string,
    delimiter: string,
}

type Topic = {
    id: number;
    name: string;
    data: string;
    blocks: Block[];
  };