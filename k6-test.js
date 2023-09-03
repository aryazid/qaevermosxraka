import http from 'k6/http';
import { group, check, sleep } from 'k6';
import { htmlReport } from "https://raw.githubusercontent.com/benc-uk/k6-reporter/main/dist/bundle.js";

export let options = {
  scenarios: {
    per_vu_test: {
      executor: 'per-vu-iterations',
      vus: 1000, // Maximum virtual users
      iterations: 3500, // Total iterations
      maxDuration: '300s', // Maximum duration for the test
    },
  },
  thresholds: {
    http_req_duration: ['p(99)<2000'], // 99% of requests should complete within 2 seconds
  },
};

export default function () {
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
      'API Response Time is less than 2s': (r) => r.timings.duration < 2000,

    }) 
    sleep(1);
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
    'API Response Time is less than 2s': (r) => r.timings.duration < 2000,
  })
  sleep(1);
});//penutup group update//Penutup group judul
} //penutup export default function

export function handleSummary(data) {
  return {
    "evermosfinal.html": htmlReport(data),
  };
}