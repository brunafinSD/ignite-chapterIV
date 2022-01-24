import { createServer, Factory, Model, Response } from 'miragejs';
import faker from 'faker';

type User = {
  name: string;
  email: string;
  created_at: string;
}

export function makeServer() {
  const server = createServer({
    models: {
      user: Model.extend<Partial<User>>({})
    },

    factories: {
      user: Factory.extend({
        name(i: number) {
          return `User ${i + 1}`
        },
        email() {
          return faker.internet.email().toLowerCase();
        },
        createdAt() {
          return faker.date.recent(10);
        },
      })
    },

    seeds(server) {
      server.createList('user', 200);
    },

    routes() {
      this.namespace = 'api';

      // vai demorar 750 milissegundos para carregar
      this.timing = 750;
      // quando chamar a rota users deve retornar a lista completa de usuarios
      this.get('/users', function (schema, request) {
        const { page = 1, per_page = 10 } = request.queryParams

        const total = schema.all('user').length

        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);

        const users = this.serialize(schema.all('user'))
          .users.slice(pageStart, pageEnd);

        return new Response(
          200,
          {'x-total-count': String(total)},
          { users }
        )
      });
      // se chamar a rota passando o objeto com nome, email e data, automaticamente o mirage vai criar a estrutura necessária para o post
      this.post('/users');

      this.namespace = '';
      this.passthrough();
    }
  });

  return server;
}

// Partial, permite todos os campos do tipo mas não precisa ter exatamente todos.