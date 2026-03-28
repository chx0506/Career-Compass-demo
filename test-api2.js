import fetch from 'node-fetch';

const API_KEY = 'QC-f840d8224b47e8c521827e119ab066e4-468ef25c528f95fbe960d4f9d42c5d97';
const BASE_URL = 'https://aiping.cn/api/v1';
const MODEL = 'DeepSeek-R1';

async function testAPI() {
  const messages = [
    { role: 'system', content: '你是一个专业的职业规划解析引擎。请严格按照JSON格式返回，不要包含任何Markdown代码块包裹。返回格式：{"skills":["技能1"],"work_context":["偏好1"],"boundaries":["限制1"]}' },
    { role: 'user', content: '【经历1】情境：在创业公司负责产品从0到1的搭建。行动：带领5人团队完成产品设计、开发、上线全流程。结果：产品上线3个月获得10万用户。感受：从无到有创造的过程让我很有成就感。' }
  ];

  // 尝试不同的参数组合
  const requestBody = {
    model: MODEL,
    messages,
    temperature: 0.7,
    max_tokens: 2000,
    response_format: { type: 'json_object' },
    // 尝试禁用推理过程
    extra: {
      enable_thinking: false
    }
  };

  console.log('发送请求...');
  const response = await fetch(`${BASE_URL}/chat/completions`, {
    method: 'POST',
    headers: {
      'Authorization': API_KEY,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(requestBody),
  });

  console.log('响应状态:', response.status, response.statusText);

  const data = await response.json();
  console.log('完整响应:');
  console.log(JSON.stringify(data, null, 2));
}

testAPI().catch(console.error);
