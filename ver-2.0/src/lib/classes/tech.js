export const techNameList = [
    '리튬이온 베터리',
    '마이크로 그리드',
    '저온 양이온 교환막',
    '압축 수소',
    '천연가스 연소',
    '알고리즘',
    '녹색 수소 생산',
    '고효율 연료전지',
    '수소 터빈',
    '대규모 액화 수소',
    '2차원 소재공학',
    '고출력 전력반도체',
    '에너지 저장 시스템',
    '페로브스카이트 태양전지',
    '핵분열',
    '고효율 촉매',
    '나노 막 구조',
    '이산화탄소 환원',
];
export const techContentList = [
    '일꾼 산이동/건설 가능',
    '일꾼 물 이동/건설 가능',
    '공격 유닛 물 이동 가능',
    '공격 유닛 산 이동 가능',
    '화력발전소 건설 가능',
    '공장 건설 가능',
    '풍력발전소 건설 가능',
    '재블린 생산 가능',
    '풍력발전소 강화',
    '수소 연구소의 에너지, 유닛 수용량 2배',
    '태양광 발전소 건설 가능',
    '윈체스터 생산 가능',
    '태양광 발전소 강화',
    '각 유닛이 에너지 생산',
    '원자력 발전소 건설 가능',
    '트리니티 생성',
    '원자력 발전소 강화',
    'ICBM 생산 가능',
];
export const techCondition = [
    {
        material: 0,
        hydrogen: 1,
        environment: 0,
        grid: 1,
        ai: 0,
    },
    { material: 1, hydrogen: 2, environment: 1, grid: 1, ai: 1 },
    {
        material: 1,
        hydrogen: 1,
        environment: 1,
        grid: 0,
        ai: 2,
    },
    {
        material: 0,
        hydrogen: 1,
        environment: 0,
        grid: 0,
        ai: 1,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 0,
        grid: 0,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 0,
        grid: 0,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 1,
        environment: 0,
        grid: 0,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 1,
        environment: 0,
        grid: 0,
        ai: 1,
    },
    {
        material: 0,
        hydrogen: 2,
        environment: 0,
        grid: 2,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 3,
        environment: 0,
        grid: 2,
        ai: 2,
    },
    {
        material: 1,
        hydrogen: 0,
        environment: 0,
        grid: 0,
        ai: 0,
    },
    {
        material: 1,
        hydrogen: 0,
        environment: 0,
        grid: 0,
        ai: 1,
    },
    {
        material: 2,
        hydrogen: 0,
        environment: 0,
        grid: 2,
        ai: 0,
    },
    {
        material: 3,
        hydrogen: 0,
        environment: 0,
        grid: 2,
        ai: 2,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 1,
        grid: 1,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 1,
        grid: 1,
        ai: 1,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 2,
        grid: 2,
        ai: 0,
    },
    {
        material: 0,
        hydrogen: 0,
        environment: 3,
        grid: 2,
        ai: 2,
    },
];

export function checkTech(tech, index) {
    for (let track in tech) {
        if (tech[track] < techCondition[index][track]) return false;
    }
    return true;
}
