// import momenet from 'moment';
// import {chunk} from 'lodash';
// const moment = require('moment');
// const { chunk } = require('lodash');

const chunkRight = (arr, size) => {
  const rm = arr.length % size;
  return rm ? [arr.slice(0, rm), ...chunk(arr.slice(rm), size)] : chunk(arr, size);
}


const mapsubmission = d => {
  if (!d) return d;

  return {
    ...d,
    sourceKey: Object.keys(d.source)[0],
    sourceValue: Object.values(d.source)[0],
    gradeNum: grScoreMap[d.grade],
    date: moment(new Date(d.created)).format('YY.MM.DD'),
  };
};

const mapArr = [
  {
      "id": 3,
      "name": "[TEST] 기초 평가",
      "slug": "series_basic",
      "limit_time": "01:00:00",
      "remain_time": "01:00:00",
      "workbook_code": "series_basic",
      "time_gap": 60,
      "num_of_problem": 3,
      "description": "이 시험은 다음으로, 문제에서 주어진 정보를 정확하고 빠르게 인지하고, 문제 상황을 해결하기 위해 필요한 정보를 작은 단위의 기능이나 절차로 분해하여 재구성할 수 있습니다. 논리적 사고를 요구하는 문제에서는 주어진 상황과 해결해야할 목표를 이해하고 실행 흐름을 파악할 수 있으며, 이러한 논리를 바탕으로 결과값을 추론할 수 있는 역량을 갖추고 있습니다.",
      "is_active": false,
      "recommended_time_min": 60,
      "is_series": true,
      "exam_id": null,
      "exam_series_id": 3,
      "exam_status": {
          "code": 0,
          "message": "PURCHASE YET",
          "period": 0
      },
      "exam": [
          {
              "id": 95,
              "name": "TestExam2",
              "slug": "r3akvvhysp0t2c7next8_exam",
              "workbook_code": "r3akvvhysp0t2c7next8_workbook",
              "time_gap": 3600,
              "num_of_problem": null,
              "description": ""
          },
          {
              "id": 624,
              "name": "[개발팀] Dummy Exam",
              "slug": "o45tibh4721oi5zxlgbg_exam",
              "workbook_code": "o45tibh4721oi5zxlgbg_workbook",
              "time_gap": 120,
              "num_of_problem": 666,
              "description": ""
          },
          {
              "id": 625,
              "name": "[시험] 기초 평가",
              "slug": "q76gkazk50yod1t06ozt_exam",
              "workbook_code": "q76gkazk50yod1t06ozt_workbook",
              "time_gap": 120,
              "num_of_problem": 3,
              "description": ""
          }
      ],
      "candidate_info": {
          "gr_info": {
              "candidate": {
                  "accuracy": 0,
                  "tcp": 0,
                  "efficiency": 0,
                  "logic": 0,
                  "code": 0,
                  "all_avg": 0,
                  "level": "F"
              },
              "upper_20": {
                  "accuracy": 0,
                  "tcp": 0,
                  "efficiency": 0,
                  "logic": 0,
                  "code": 0,
                  "all_avg": 0,
                  "level": "F"
              }
          },
          "passing_difficulty": "-",
          "algorithm_domain": [
              null
          ],
          "candidate_distribution": [
              {
                  "score": 0,
                  "value": 5
              },
              {
                  "score": 100,
                  "value": 1
              },
              {
                  "score": 200,
                  "value": 154
              },
              {
                  "score": 300,
                  "value": 1
              }
          ],
          "avg_score": 122.14,
          "my_score": 0
      }
  },
  {
      "id": 4,
      "name": "[TEST] 중급 평가",
      "slug": "6tnm9xzy9re0gahqxlhu_series",
      "limit_time": "02:00:00",
      "remain_time": "02:00:00",
      "workbook_code": "6tnm9xzy9re0gahqxlhu_series",
      "time_gap": 120,
      "num_of_problem": 4,
      "description": "-",
      "is_active": false,
      "recommended_time_min": 120,
      "is_series": true,
      "exam_id": null,
      "exam_series_id": 4,
      "exam_status": {
          "code": 0,
          "message": "PURCHASE YET",
          "period": 0
      },
      "exam": [
          {
              "id": 626,
              "name": "[시험] 중급 평가",
              "slug": "nrh49zqifrv225436dq2_exam",
              "workbook_code": "nrh49zqifrv225436dq2_workbook",
              "time_gap": 120,
              "num_of_problem": 4,
              "description": ""
          }
      ],
      "candidate_info": {
          "gr_info": {
              "candidate": {
                  "accuracy": 0.0,
                  "tcp": 0.0,
                  "efficiency": 0.0,
                  "logic": 0.0,
                  "code": 0.0,
                  "all_avg": 0.0,
                  "level": "F"
              },
              "upper_20": {
                  "accuracy": 0.0,
                  "tcp": 0.0,
                  "efficiency": 0.0,
                  "logic": 0.0,
                  "code": 0.0,
                  "all_avg": 0.0,
                  "level": "F"
              }
          },
          "passing_difficulty": "-",
          "algorithm_domain": [
              "Brute Force",
              "Recursion",
              "Simulation",
              "String"
          ],
          "candidate_distribution": [
              {
                  "score": 0,
                  "value": 22
              },
              {
                  "score": 100,
                  "value": 0
              },
              {
                  "score": 200,
                  "value": 0
              },
              {
                  "score": 300,
                  "value": 0
              },
              {
                  "score": 400,
                  "value": 0
              }
          ],
          "avg_score": 0.0,
          "my_score": 0
      }
  },
  {
      "id": 5,
      "name": "[TEST] 고급 평가",
      "slug": "5ecixf4hh9ewrxe0l6co_series",
      "limit_time": "00:00:00",
      "remain_time": "00:00:00",
      "workbook_code": "5ecixf4hh9ewrxe0l6co_series",
      "time_gap": 0,
      "num_of_problem": 0,
      "description": "-",
      "is_active": false,
      "recommended_time_min": 0,
      "is_series": true,
      "exam_id": null,
      "exam_series_id": 5,
      "exam_status": {
          "code": 0,
          "message": "PURCHASE YET",
          "period": 0
      },
      "exam": [
          {
              "id": 627,
              "name": "[시험] 고급 평가",
              "slug": "pru0ljrq1rqc23jl0yhl_exam",
              "workbook_code": "pru0ljrq1rqc23jl0yhl_workbook",
              "time_gap": 120,
              "num_of_problem": 3,
              "description": ""
          }
      ],
      "candidate_info": {
          "gr_info": {
              "candidate": {
                  "accuracy": 0,
                  "tcp": 0,
                  "efficiency": 0,
                  "logic": 0,
                  "code": 0,
                  "all_avg": 0,
                  "level": "F"
              },
              "upper_20": {
                  "accuracy": 0,
                  "tcp": 0,
                  "efficiency": 0,
                  "logic": 0,
                  "code": 0,
                  "all_avg": 0,
                  "level": "F"
              }
          },
          "passing_difficulty": "-",
          "algorithm_domain": [
              null
          ],
          "candidate_distribution": [],
          "avg_score": null,
          "my_score": 0
      }
  }
]

const mapToArray = map => {
  return Object.values(map).sort((a, b) => a.index - b.index);
}
const API_STATUS = {
  UNKNOWN: 'request',
}

const mapSeriesEntry = arr => {
  return arr.reduce(
    (entry, entity, index) => {
      console.log(entity)
      return {
        
        [entity.id]: {...entity, index, details: { apiStatus: API_STATUS.UNKNOWN, data: {}, isOpen: false}}
      }
    }
  )
}
console.log((mapArr))

const mapProblemEntry = arr => {
  return arr.reduce(
    (entry, entity, index) => {
      entity[entity.problem.id] = {
        ...entity,
        index,
        answerCode: {apiStatus: API_STATUS.UNKNOWN, languages: []}
      }
      return entity;
    }, {});
}
// console.log(mapSeriesEntry(mapArr))

function useInterval(callback, delay) {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;

  }, [callback])

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }

    if(delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
    return null;
  }, [delay]);
}
// setinterval 대신 커스텀 useInterval을 사용하여 1초에 1씩 count 증가하도록 만든 컴포넌트
const Counter = () => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 1000)

  return (
    <h1>{count}</h1>
  )

}