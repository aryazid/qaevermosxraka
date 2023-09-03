import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";



export default function () {
  group('Integration API Testing', () =>{
    group('Create POST', function(){
    const url = 'https://reqres.in/api/users';
    const payload = JSON.stringify({
    name: "morpheus",
    job: "leader",
    id: "9" });

    const params = {
      headers:{'Content-Type' : 'application/json',
    },};

    const create = http.post(url,payload,params);
    check(create, {
      'Is status 201':(r) => r.status === 201,
      'Is create body has name': (r) => r.body.includes('morpheus'),
      'Is create body has name & job': (r) => r.body.includes('morpheus') && r.body.includes('leader'),
      'Is Cpdate body has id': (r) => r.body.includes('9'),
    });
  });//penutup group create

  group('Update PUT', function(){
    const url2 = 'https://reqres.in/api/users/2';
    const payloads = JSON.stringify({
      name: "morpheus",
      job: "zion resident",
      id: "8",
    });

    const params2 = {
      headers:{'Content-Type' : 'application/json',
    },};

    const update = http.put(url2,payloads,params2);
    check(update, {
    'Is status 200':(r) => r.status === 200,
    'Is update body has name': (r) => r.body.includes('morpheus'),
    'Is update body has name & job': (r) => r.body.includes('morpheus') && r.body.includes('zion resident'),
    'Is Update body has id': (r) => r.body.includes('8'), 
  });
});//penutup group update
  });
} //penutup export default function

