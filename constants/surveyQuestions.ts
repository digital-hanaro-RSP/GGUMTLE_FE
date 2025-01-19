import { SurveyQuestions } from '@/types/Survey';

export const surveyQuestions: SurveyQuestions = {
  1: {
    question: '귀하의 나이대가 어떻게 되시나요?',
    options: [
      { id: 'op1', value: 2.5, label: '19세 이하' },
      { id: 'op2', value: 2.5, label: '20~29세' },
      { id: 'op3', value: 2.0, label: '30~39세' },
      { id: 'op4', value: 1.5, label: '40~49세' },
      { id: 'op5', value: 1.0, label: '50~59세' },
      { id: 'op6', value: 0.5, label: '60세 이상' },
    ],
  },
  2: {
    question: '1년 동안 버는 돈이 얼마나 되시나요?',
    options: [
      { id: 'op1', value: 1.0, label: '3천만원 이하' },
      { id: 'op2', value: 2.0, label: '5천만원 이하' },
      { id: 'op3', value: 3.0, label: '7천만원 이하' },
      { id: 'op4', value: 3.5, label: '9천만원 이하' },
      { id: 'op5', value: 4.0, label: '9천만원 넘음' },
    ],
  },
  3: {
    question:
      '가지고 계신 전체 재산 중에서 금융상품(예금, 주식 등)이 차지하는 비율이 얼마나 되시나요?',
    options: [
      {
        id: 'op1',
        value: 1.0,
        label: '5% 미만 (예: 전체 재산이 1억원이면 500만원 미만)',
      },
      {
        id: 'op2',
        value: 2.0,
        label: '10% 미만 (예: 전체 재산이 1억원이면 1천만원 미만)',
      },
      {
        id: 'op3',
        value: 2.5,
        label: '15% 미만 (예: 전체 재산이 1억원이면 1천5백만원 미만)',
      },
      {
        id: 'op4',
        value: 3.0,
        label: '20% 미만 (예: 전체 재산이 1억원이면 2천만원 미만)',
      },
      {
        id: 'op5',
        value: 3.5,
        label: '20% 넘음 (예: 전체 재산이 1억원이면 2천만원 이상)',
      },
    ],
  },
  4: {
    question: '앞으로의 수입이 어떻게 될 것 같으신가요?',
    options: [
      {
        id: 'op1',
        value: 4.0,
        label: '지금처럼 꾸준히 벌 수 있거나 더 많이 벌 수 있을 것 같다',
      },
      {
        id: 'op2',
        value: 2.5,
        label: '지금은 벌고 있지만 앞으로는 줄어들 것 같다',
      },
      {
        id: 'op3',
        value: 1.0,
        label: '현재 수입이 없고 연금으로만 생활한다',
      },
    ],
  },
  5: {
    question: '지금까지 어떤 금융상품에 투자해보셨나요?',
    options: [
      {
        id: 'op1',
        value: 1.0,
        label: '은행 예금, 적금 정도만 해봤다',
      },
      {
        id: 'op2',
        value: 2.5,
        label: '안전한 채권이나 원금보장되는 금융상품을 해봤다',
      },
      {
        id: 'op3',
        value: 4.0,
        label: '원금의 일부만 보장되는 상품이나 주식형 펀드를 해봤다',
      },
      {
        id: 'op4',
        value: 5.5,
        label: '주식투자나 원금이 보장되지 않는 상품을 해봤다',
      },
      {
        id: 'op5',
        value: 7.0,
        label: '선물옵션 등 위험도가 높은 투자를 해봤다',
      },
    ],
  },
  6: {
    question: '금융상품에 대해 얼마나 알고 계신가요?',
    options: [
      {
        id: 'op1',
        value: 1.0,
        label: '금융상품 투자를 직접 해본 적이 없다',
      },
      {
        id: 'op2',
        value: 3.0,
        label: '예금과 주식이 어떻게 다른지 정도는 안다',
      },
      {
        id: 'op3',
        value: 5.0,
        label: '대부분의 금융상품의 특징을 잘 알고 있다',
      },
      {
        id: 'op4',
        value: 7.0,
        label: '모든 금융상품에 대해 전문가 수준으로 잘 알고 있다',
      },
    ],
  },
  7: {
    question: '투자하실 때 어떤 것을 더 중요하게 생각하시나요?',
    options: [
      {
        id: 'op1',
        value: 4.5,
        label: '돈을 많이 벌고 싶지만, 원금을 지키는 게 더 중요하다',
      },
      {
        id: 'op2',
        value: 6.5,
        label: '원금을 잃을 수도 있지만, 수익을 더 많이 내고 싶다',
      },
      {
        id: 'op3',
        value: 8.5,
        label: '손해를 볼 수 있어도 높은 수익을 원한다',
      },
    ],
  },
  8: {
    question: '투자로 인한 손실을 어느 정도까지 견딜 수 있으신가요?',
    options: [
      {
        id: 'op1',
        value: 4.0,
        label: '투자금액이 줄어드는 것은 원하지 않는다',
      },
      {
        id: 'op2',
        value: 6.0,
        label: '10%까지는 손해를 볼 수 있다 (예: 1천만원 투자시 100만원)',
      },
      {
        id: 'op3',
        value: 8.0,
        label: '20%까지는 손해를 볼 수 있다 (예: 1천만원 투자시 200만원)',
      },
      {
        id: 'op4',
        value: 10.0,
        label: '수익이 크다면 큰 손해도 감수할 수 있다',
      },
    ],
  },
};
