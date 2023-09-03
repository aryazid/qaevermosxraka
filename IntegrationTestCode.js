import http from 'k6/http';
import { group, check, sleep } from 'k6';

export default function () {
  group('Integration API Test',() => {
    group('Create POST', function(){
    const url = 'https://reqres.in/api/users';
    const payload = JSON.stringify({
    name: "morpheus",
    job: "leader", });

    const params = {
      headers:{'Content-Type' : 'application/json',
    },};

    const create = http.post(url,payload,params);
    check(create, {
      'Is status 201':(r) => r.status === 201,
      'Is create body has name': (r) => r.body.includes('morpheus'),
      'Is create body has name & job': (r) => r.body.includes('morpheus') && r.body.includes('leader'),
    });
  });//penutup group create

  group('Update PUT', function(){
    const url2 = 'https://reqres.in/api/users/2';
    const payloads = JSON.stringify({
      name: "morpheus",
      job: "zion resident",
    });

    const params2 = {
      headers:{'Content-Type' : 'application/json',
    },};

    const update = http.put(url2,payloads,params2);
    check(update, {
    'Is status 200':(r) => r.status === 200,
    'Is update body has name': (r) => r.body.includes('morpheus'),
    'Is update body has name & job': (r) => r.body.includes('morpheus') && r.body.includes('zion resident'),
  });
});//penutup group update
})
} //penutup export default function
