type UserContextType = {
    user: string
    Login : (user: string) => void
    AddTopic: (topic: Topic) => void
    GetTopics: () => void
    GetTopicById: (id: string) => Promise<Topic | null>
    UpdateTopic: (topic: Topic) => Promise<void>
    topics: CompactTopic[]
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
    _id?: string;
    name: string;
    blocks: Block[];
  };

type CompactTopic = {
    _id: string;
    name: string;
    understanding: number;
}