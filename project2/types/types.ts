interface TAG {
  id: string;
  name: string;
}

export interface POST {
  id: number;
  title: string;
  content: string;
  username: string;
  tags: TAG[];
  created_at: string;
}
