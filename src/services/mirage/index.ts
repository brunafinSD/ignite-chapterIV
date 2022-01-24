import { createServer, Model } from 'miragejs';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer(){
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },
    routes(){
      this.namespace = 'api';

      // vai demorar 750 milissegundos para carregar
      this.timing = 750;
      // quando chamar a rota users deve retornar a lista completa de usuarios
      this.get('/users');
      // se chamar a rota passando o objeto com nome, email e data, automaticamente o mirage vai criar a estrutura necessária para o post
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}

// Partial, permite todos os campos do tipo mas não precisa ter exatamente todos.