// 此文件由自动脚本生成，作为系统默认计划规则库
import type { Rule } from '../../shared/types.js'

export const defaultRules: Omit<Rule, 'id'>[] = [
  {
    "name": "签署商管服务协议、商标许可协议（如有）、商管软件系统授权许可协议",
    "level": 0,
    "profession": "投拓",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "/",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "/"
  },
  {
    "name": "召开内部投后交圈会",
    "level": 3,
    "profession": "投拓",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "商管签约",
    "offset_days": 5,
    "duration_days": 5,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "5",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "商业项目经理到位",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "商管签约",
    "offset_days": 5,
    "duration_days": 5,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "5",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "与万达地产召开咨询服务工作首次会议",
    "level": 2,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "投后交圈会",
    "offset_days": -15,
    "duration_days": 15,
    "dependencies": [
      {
        "node": "内部投后交圈会",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "无",
    "dependency_remark": "@1.2/内部投后交圈会"
  },
  {
    "name": "项目筹备期计划编制完成",
    "level": 1,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "商管签约",
    "offset_days": 60,
    "duration_days": 60,
    "dependencies": [
      {
        "node": "商管服务协议签署后2个月内",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "60",
    "dependency_remark": "@1.1/商管服务协议签署后2个月内"
  },
  {
    "name": "收取第一笔前期定位及设计咨询服务费",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "现场踏勘",
    "level": 3,
    "profession": "产策",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "商管签约",
    "offset_days": -15,
    "duration_days": 15,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "无",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "定位工作坊（如有）",
    "level": 3,
    "profession": "产策",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "商管签约",
    "offset_days": -45,
    "duration_days": 45,
    "dependencies": [
      {
        "node": "现场踏勘、设计概念30",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "无",
    "dependency_remark": "@2.2/现场踏勘、设计概念30"
  },
  {
    "name": "完成《商业项目定位报告V1.0》内审并通过，万达地产确认后收取服务费",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、投前定位研判完成",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产启动概念设计30%",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "1、投前定位研判完成\n2、万达地产启动概念设计30%"
  },
  {
    "name": "重点空间及主力店提资",
    "level": 3,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "定位报告V1.0（内审）、V1.0万达地产确认；",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产概念设计50%完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "1、@2.4/定位报告V1.0（内审）、V1.0万达地产确认；\n2、万达地产概念设计50%完成"
  },
  {
    "name": "（如有）完成《商业项目定位报告V2.0》内审并通过，万达地产确认",
    "level": 3,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "定位报告V1.0（内审）、V1.0万达地产确认；",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产概念设计50%完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "1、@2.4/定位报告V1.0（内审）、V1.0万达地产确认；\n2、万达地产概念设计50%完成"
  },
  {
    "name": "购物中心案名确认",
    "level": 2,
    "profession": "产策",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "出具概念阶段购物中心提资清单",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产概念设计50%完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "自定义",
    "dependency_remark": "万达地产概念设计50%完成"
  },
  {
    "name": "出具方案阶段购物中心提资清单",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 15,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产建筑概念设计100%完成且万象生活评审通过",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "15",
    "dependency_remark": "万达地产建筑概念设计100%完成且万象生活评审通过"
  },
  {
    "name": "出具初设阶段购物中心提资清单",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 15,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产建筑方案设计100%完成且万象生活评审通过",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "15",
    "dependency_remark": "万达地产建筑方案设计100%完成且万象生活评审通过"
  },
  {
    "name": "出具施工图阶段购物中心提资清单",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产建筑初步设计100%完成且万象生活评审通过",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产建筑初步设计100%完成且万象生活评审通过"
  },
  {
    "name": "出具建筑概念设计50%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成建筑概念50%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、产品定位报告有初步成果",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成建筑概念50%设计成果，深度满足要求\n2、产品定位报告有初步成果"
  },
  {
    "name": "出具建筑概念设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成建筑概念100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "定位报告1.0完成",
        "type": "prerequisite"
      },
      {
        "node": "概念阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成建筑概念100%设计成果，深度满足要求\n2、@2.4/定位报告1.0完成\n3、@2.8/概念阶段提资完成"
  },
  {
    "name": "出具结构概念设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成结构概念100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "定位报告1.0完成",
        "type": "prerequisite"
      },
      {
        "node": "概念阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成结构概念100%设计成果，深度满足要求\n2、@2.4/定位报告1.0完成\n3、@2.8/概念阶段提资完成"
  },
  {
    "name": "出具室内概念设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成室内概念100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑概念100%完成",
        "type": "prerequisite"
      },
      {
        "node": "概念阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成室内概念100%设计成果，深度满足要求\n2、建筑概念100%完成\n3、@2.8/概念阶段提资完成"
  },
  {
    "name": "出具景观概念设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成景观概念100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑概念100%完成",
        "type": "prerequisite"
      },
      {
        "node": "概念阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成景观概念100%设计成果，深度满足要求\n2、建筑概念100%完成\n3、@2.8/概念阶段提资完成"
  },
  {
    "name": "出具建筑方案设计100%咨询意见，万达地产确认后收取服务费",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成建筑方案100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "方案阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成建筑方案100%设计成果，深度满足要求\n2、@2.9/方案阶段提资完成"
  },
  {
    "name": "出具结构方案设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成结构方案100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "方案阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成结构方案100%设计成果，深度满足要求\n2、@2.9/方案阶段提资完成"
  },
  {
    "name": "出具机电方案设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成机电方案100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "方案阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成机电方案100%设计成果，深度满足要求\n2、@2.9/方案阶段提资完成"
  },
  {
    "name": "出具室内方案设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成室内方案100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑方案设计100%完成",
        "type": "prerequisite"
      },
      {
        "node": "方案设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成室内方案100%设计成果，深度满足要求\n2、建筑方案设计100%完成\n3、@2.9/方案设计阶段提资完成"
  },
  {
    "name": "出具景观方案设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成景观方案100%设计成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑方案设计100%完成",
        "type": "prerequisite"
      },
      {
        "node": "方案设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成景观方案100%设计成果，深度满足要求\n2、建筑方案设计100%完成\n3、@2.9/方案设计阶段提资完成"
  },
  {
    "name": "出具建筑扩初设计100%咨询意见，万达地产确认后收取服务费",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成建初步设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "初步设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成建初步设计100%成果，深度满足要求\n2、@2.10/初步设计阶段提资完成"
  },
  {
    "name": "出具结构扩初设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成结构初步设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "初步设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成结构初步设计100%成果，深度满足要求\n2、@2.10/初步设计阶段提资完成"
  },
  {
    "name": "出具机电扩初设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成机电初步设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "初步设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成机电初步设计100%成果，深度满足要求\n2、@2.10/初步设计阶段提资完成"
  },
  {
    "name": "出具室内扩初设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成室内初步设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑初步设计100%完成",
        "type": "prerequisite"
      },
      {
        "node": "初步设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成室内初步设计100%成果，深度满足要求\n2、建筑初步设计100%完成\n3、@2.10/初步设计阶段提资完成"
  },
  {
    "name": "出具景观扩初设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成景观初步设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "2、建筑初步设计100%完成",
        "type": "prerequisite"
      },
      {
        "node": "初步设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成景观初步设计100%成果，深度满足要求\n2、建筑初步设计100%完成\n3、@2.10/初步设计阶段提资完成"
  },
  {
    "name": "出具建筑施工图设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成建筑施工图设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "施工图设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成建筑施工图设计100%成果，深度满足要求\n2、@2.11/施工图设计阶段提资完成"
  },
  {
    "name": "出具结构施工图设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成结构施工图设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "施工图设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成结构施工图设计100%成果，深度满足要求\n2、@2.11/施工图设计阶段提资完成"
  },
  {
    "name": "出具机电施工图设计100%咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、万达地产组织设计单位完成机电施工图设计100%成果，深度满足要求",
        "type": "prerequisite"
      },
      {
        "node": "施工图设计阶段提资完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、万达地产组织设计单位完成机电施工图设计100%成果，深度满足要求\n2、@2.11/施工图设计阶段提资完成"
  },
  {
    "name": "出具幕墙设计样板咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": -10125,
    "duration_days": 10125,
    "dependencies": [
      {
        "node": "万达地产组织现场进行幕墙设计样板打样",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产组织现场进行幕墙设计样板打样"
  },
  {
    "name": "出具精装设计样板咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": -12150,
    "duration_days": 12150,
    "dependencies": [
      {
        "node": "万达地产组织现场进行精装设计样板打样",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产组织现场进行精装设计样板打样"
  },
  {
    "name": "出具景观设计样板咨询意见",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": -30390,
    "duration_days": 30390,
    "dependencies": [
      {
        "node": "万达地产组织现场进行景观设计样板打样",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产组织现场进行景观设计样板打样"
  },
  {
    "name": "完成《招商策略计划书》或《租金定价及业态组合方案》（大众、普通、非标可适用），万达地产确认",
    "level": 1,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "完成扩初设计100%商业各专业提资；",
        "type": "prerequisite"
      },
      {
        "node": "定位报告通过；",
        "type": "prerequisite"
      },
      {
        "node": "《物业管理标准定价方案》审批完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@2.10/完成扩初设计100%商业各专业提资；\n2、@2.4/定位报告通过；\n3、@4.13/《物业管理标准定价方案》审批完成"
  },
  {
    "name": "向万达地产出具招商中心方案意见",
    "level": 3,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产明确招商中心建设方案",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产明确招商中心建设方案"
  },
  {
    "name": "启动收取第一阶段招商管理服务费",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前24个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前24个月"
  },
  {
    "name": "正式启用招商中心",
    "level": 2,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前18个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前18个月"
  },
  {
    "name": "落位项目招商统筹人",
    "level": 1,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业筹备预算汇报万达地产通过",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.89/开业筹备预算汇报万达地产通过"
  },
  {
    "name": "完成《项目定位与招商策略回顾报告》",
    "level": 1,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "招商策略计划书审批完成；",
        "type": "prerequisite"
      },
      {
        "node": "2、实施施工图完成；",
        "type": "prerequisite"
      },
      {
        "node": "3、完成商业各专业提资",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@3.1/招商策略计划书审批完成；\n2、实施施工图完成；\n3、完成商业各专业提资"
  },
  {
    "name": "确定租赁合同范本",
    "level": 2,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前18个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前18个月"
  },
  {
    "name": "主力店签约",
    "level": 2,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "确定租赁合同范本",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@3.7/确定租赁合同范本"
  },
  {
    "name": "租赁合同签署率（户数）达到50%",
    "level": 1,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "招策回顾评审完成；",
        "type": "prerequisite"
      },
      {
        "node": "ileasing铺位初始化完成；",
        "type": "prerequisite"
      },
      {
        "node": "开业前8个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@3.6/招策回顾评审完成；\n2、@4.80/ileasing铺位初始化完成；\n3、@4.98/开业前8个月"
  },
  {
    "name": "租赁合同签署率（户数）达到75%",
    "level": 1,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前4个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前4个月"
  },
  {
    "name": "租赁合同签署率（户数）达到90%",
    "level": 2,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前2个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前2个月"
  },
  {
    "name": "收取第二阶段招商管理服务费",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "购物中心开业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/购物中心开业"
  },
  {
    "name": "招商管理服务费结算",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "购物中心首个经营年度结束",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/购物中心首个经营年度结束"
  },
  {
    "name": "商业项目与万达地产方签订安全管理协议",
    "level": 3,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 90,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业前6个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/项目开业前6个月"
  },
  {
    "name": "商业项目与租户签订安全管理协议",
    "level": 3,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "租户进场前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.38/租户进场前完成"
  },
  {
    "name": "项目与其他相关方签订安全管理协议",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "相关方进场前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "相关方进场前完成"
  },
  {
    "name": "安全管理人员取证培训报名",
    "level": 3,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "相关岗位到岗后；",
        "type": "prerequisite"
      },
      {
        "node": "在开业前6个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.14/相关岗位到岗后；\n2、@4.98/在开业前6个月"
  },
  {
    "name": "危险源辨识",
    "level": 3,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业前6个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/项目开业前6个月"
  },
  {
    "name": "建立EHS管理体系",
    "level": 3,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业时间确认",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.86/项目开业时间确认"
  },
  {
    "name": "项目合规证照办理",
    "level": 3,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业时间确认",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.86/项目开业时间确认"
  },
  {
    "name": "全员EHS责任书签订",
    "level": 3,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业时间确认",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.86/项目开业时间确认"
  },
  {
    "name": "安全教育培训",
    "level": 3,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前完成"
  },
  {
    "name": "完成开业前安全检查，出具检查报告及隐患整改清单",
    "level": 2,
    "profession": "EHS",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前完成"
  },
  {
    "name": "确认万达地产完成高风险问题整改，且书面确定遗留问题",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "完成开业前安全检查",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.10/完成开业前安全检查"
  },
  {
    "name": "物业负责人到岗",
    "level": 1,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "完成《物业管理标准定价方案》",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业定位报告评审通过",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@2.4/商业定位报告评审通过"
  },
  {
    "name": "出具《物业管理执行方案》",
    "level": 1,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "明确项目定位；",
        "type": "prerequisite"
      },
      {
        "node": "物业负责人到岗；",
        "type": "prerequisite"
      },
      {
        "node": "《物业管理标准定价方案》审批完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@2.4/明确项目定位；\n2、@4.12/物业负责人到岗；\n3、@4.13/《物业管理标准定价方案》审批完成"
  },
  {
    "name": "出具《集中装修期管理方案》",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前6个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前6个月"
  },
  {
    "name": "出具《物业开办计划》",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "物业人员进场计划；",
        "type": "prerequisite"
      },
      {
        "node": "开业时间明确",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.14/物业人员进场计划；\n2、@4.86/开业时间明确"
  },
  {
    "name": "出具《物业开业保障方案》",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业活动方案明确",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "开业活动方案明确"
  },
  {
    "name": "确认地下室地坪工程及车位划线完成",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的停车场交通方案及导引导视方案评审完成，并完成划线机导视打样",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的停车场交通方案及导引导视方案评审完成，并完成划线机导视打样"
  },
  {
    "name": "确认室外景观施工完成",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的景观方案评审完成并根据意见落实",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的景观方案评审完成并根据意见落实"
  },
  {
    "name": "确认完成政府开业前消防安全检查",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的消防硬件完成安装，消防联动正常",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的消防硬件完成安装，消防联动正常"
  },
  {
    "name": "确认正式通水电75%（户数）",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的正式水电已开通",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的正式水电已开通"
  },
  {
    "name": "收回《排污许可证》等证件资料文件",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的给排水系统安装完成、通球试验完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的给排水系统安装完成、通球试验完成"
  },
  {
    "name": "确认正式通气到厨房灶台",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的燃气施工完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的燃气施工完成"
  },
  {
    "name": "确认完成机电系统综合调试",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的机电系统安装完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的机电系统安装完成"
  },
  {
    "name": "接收设备设施及场地",
    "level": 1,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "确认万达地产完成承接查验问题整改",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.31/确认万达地产完成承接查验问题整改"
  },
  {
    "name": "取得停车场登记备案或联网登记等",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责完成竣工验收",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.93/万达地产主责完成竣工验收"
  },
  {
    "name": "商业公司聘请承接查验第三方单位",
    "level": 3,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "最晚于开业前6个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/最晚于开业前6个月"
  },
  {
    "name": "接收万达地产承接查验纸质资料",
    "level": 1,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "明确资料清单",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/明确资料清单"
  },
  {
    "name": "承接查验标准及方案评审完成",
    "level": 1,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "承接查验第三方单位确定",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.27/承接查验第三方单位确定"
  },
  {
    "name": "第三方单位出具承接查验整改清单",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "@4.24万达地产主责的机电安装完成，第三方单位具备进场条件",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.24万达地产主责的机电安装完成，第三方单位具备进场条件"
  },
  {
    "name": "确认万达地产完成承接查验问题整改",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "承接查验整改清单出具",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.30/承接查验整改清单出具"
  },
  {
    "name": "《租户装修手册》编制",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "TC负责人到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.17/TC负责人到岗"
  },
  {
    "name": "租户工程条件提资",
    "level": 2,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "招商洽谈品牌",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "招商洽谈品牌"
  },
  {
    "name": "租户条件图出图",
    "level": 2,
    "profession": "设计",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "招商与租户确定工程条件；",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产协调设计院出具条件图",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.33/招商与租户确定工程条件；\n2、万达地产协调设计院出具条件图"
  },
  {
    "name": "招商移交",
    "level": 1,
    "profession": "招商",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "主力店工程条件已拉通确认；",
        "type": "prerequisite"
      },
      {
        "node": "招商完成主力店签约",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.33/主力店工程条件已拉通确认；\n2、@3.8/招商完成主力店签约"
  },
  {
    "name": "租户平面、效果、施工图审核",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、租户设计指引发放；",
        "type": "prerequisite"
      },
      {
        "node": "2、现场具备复尺条件",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、租户设计指引发放；\n2、现场具备复尺条件"
  },
  {
    "name": "接收万达地产铺位",
    "level": 2,
    "profession": "商业物业",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目开业日确定；",
        "type": "prerequisite"
      },
      {
        "node": "招商移交；",
        "type": "prerequisite"
      },
      {
        "node": "3、万达地产主责的现场工程条件实施完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.86/项目开业日确定；\n2、@4.35/招商移交；\n3、万达地产主责的现场工程条件实施完成"
  },
  {
    "name": "租户接场",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管中心完成铺位接收；",
        "type": "prerequisite"
      },
      {
        "node": "招商移交。",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.37/商管中心完成铺位接收；\n2、@4.35/招商移交。"
  },
  {
    "name": "租户进场装修（主力店）",
    "level": 1,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的项目消防验收及竣备完成；",
        "type": "prerequisite"
      },
      {
        "node": "2、图纸审核完成；",
        "type": "prerequisite"
      },
      {
        "node": "3、进场手续办理完成，含保险、人员备案等",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.92@4.93/万达地产主责的项目消防验收及竣备完成；\n2、图纸审核完成；\n3、进场手续办理完成，含保险、人员备案等"
  },
  {
    "name": "租户进场装修50%（户数）",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "租赁合同签署率（户数）达到50%",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@3.9/租赁合同签署率（户数）达到50%"
  },
  {
    "name": "租户进场装修75%（户数）",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "租赁合同签署率（户数）达到75%",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@3.10/租赁合同签署率（户数）达到75%"
  },
  {
    "name": "商业项目月度运营筹备进展备案",
    "level": 3,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业筹备会",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.88/开业筹备会"
  },
  {
    "name": "租户装修期管理",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "租户进场装修；",
        "type": "prerequisite"
      },
      {
        "node": "TC、工程、管业人员落位且明确管理职责",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.39/租户进场装修；\n2、@5.14/TC、工程、管业人员落位且明确管理职责"
  },
  {
    "name": "租户竣工验收",
    "level": 2,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "店铺装修完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.43/店铺装修完成"
  },
  {
    "name": "租户消防开业检",
    "level": 1,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的项目完成一次消防验收和开业检；",
        "type": "prerequisite"
      },
      {
        "node": "店铺装修完成、人员货品到位",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.92/万达地产主责的项目完成一次消防验收和开业检；\n2、@4.43/店铺装修完成、人员货品到位"
  },
  {
    "name": "租户燃气通气",
    "level": 1,
    "profession": "TC",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "项目完成一次通气（可同时进行）",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.23/项目完成一次通气（可同时进行）"
  },
  {
    "name": "租户手册编制",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "营运部负责人到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.17/营运部负责人到岗"
  },
  {
    "name": "多经点位提资",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "营运部负责人到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.17/营运部负责人到岗"
  },
  {
    "name": "租赁仓库需求提资",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前8个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前8个月"
  },
  {
    "name": "租户合规证照办理",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "证照取得：规划验收、门牌地址证明信、地下空间备案、房产证（或替代文件）；",
        "type": "prerequisite"
      },
      {
        "node": "2、沟通政府开通地址平台，启动营业执照、食药办理，协调特殊证照办理",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.28/证照取得：规划验收、门牌地址证明信、地下空间备案、房产证（或替代文件）；\n2、沟通政府开通地址平台，启动营业执照、食药办理，协调特殊证照办理"
  },
  {
    "name": "开业预算和业绩目标确认",
    "level": 1,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、招商品牌确认100%，根据品牌清单进行业绩测算；",
        "type": "prerequisite"
      },
      {
        "node": "开业前整合策略报告；",
        "type": "prerequisite"
      },
      {
        "node": "开业日确定",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、招商品牌确认100%，根据品牌清单进行业绩测算；\n2、@4.57/开业前整合策略报告；\n3、@4.86/开业日确定"
  },
  {
    "name": "开业促销活动",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业日确定；",
        "type": "prerequisite"
      },
      {
        "node": "开业预算及业绩目标确定",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.86/开业日确定；\n2、@4.51/开业预算及业绩目标确定"
  },
  {
    "name": "店铺人员招聘",
    "level": 3,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业日确定；",
        "type": "prerequisite"
      },
      {
        "node": "店铺进场装修",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.86/开业日确定；\n2、@4.39/店铺进场装修"
  },
  {
    "name": "经营期保险办理",
    "level": 2,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1、店铺竣工；",
        "type": "prerequisite"
      },
      {
        "node": "营业执照办理",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、店铺竣工；\n2、@4.50/营业执照办理"
  },
  {
    "name": "店铺人员培训",
    "level": 3,
    "profession": "营运",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业日确定；",
        "type": "prerequisite"
      },
      {
        "node": "2、店铺人员到位",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.86/开业日确定；\n2、店铺人员到位"
  },
  {
    "name": "确认推广类前介提资有效性",
    "level": 2,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "推广提资人员已到岗",
        "type": "prerequisite"
      },
      {
        "node": "2、项目全面进入施工图阶段",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.14/推广提资人员已到岗\n2、项目全面进入施工图阶段"
  },
  {
    "name": "完成《开业前整合策略报告》",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "推广负责人已到岗",
        "type": "prerequisite"
      },
      {
        "node": "项目品牌定位（一般商业定位报告包含该部分内容，特别的如前沿创新类项目需要单独进行品牌定位）及@3.1/招商策略报告已完成",
        "type": "prerequisite"
      },
      {
        "node": "开业时间已确定",
        "type": "prerequisite"
      },
      {
        "node": "开办费审批已完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.17/推广负责人已到岗\n2、@2.4/项目品牌定位（一般商业定位报告包含该部分内容，特别的如前沿创新类项目需要单独进行品牌定位）及@3.1/招商策略报告已完成\n3、@4.86/开业时间已确定\n4、@4.89/开办费审批已完成"
  },
  {
    "name": "完成推广全年计划",
    "level": 3,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "与《开业前整合策略报告》同期启动",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.57/与《开业前整合策略报告》同期启动"
  },
  {
    "name": "签订媒体资源年度合作框架",
    "level": 2,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "《开业前整合策略报告》完成审批",
        "type": "prerequisite"
      },
      {
        "node": "推广全年计划已完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.57/《开业前整合策略报告》完成审批\n2、@4.58/推广全年计划已完成"
  },
  {
    "name": "取得户外广告使用审批许可",
    "level": 3,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产提供开业前的户外广告使用许可",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产提供开业前的户外广告使用许可"
  },
  {
    "name": "编制多经资源定价清单",
    "level": 3,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "推广类前介提资复核已完成",
        "type": "prerequisite"
      },
      {
        "node": "2、广告位整改已完成（如有）",
        "type": "prerequisite"
      },
      {
        "node": "户外广告使用政府报批已完成。",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.56/推广类前介提资复核已完成\n2、广告位整改已完成（如有）\n3、@4.60/户外广告使用政府报批已完成。"
  },
  {
    "name": "完成开业仪式方案",
    "level": 2,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "与万达地产确定购物中心开业日",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.86/与万达地产确定购物中心开业日"
  },
  {
    "name": "确认推广类提资按需预留及整改完成",
    "level": 3,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "完成推广类前介提资在施工图阶段的复核",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@2.27/完成推广类前介提资在施工图阶段的复核"
  },
  {
    "name": "组织万达地产更换万象标识",
    "level": 3,
    "profession": "推广",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "案名审批已完成",
        "type": "prerequisite"
      },
      {
        "node": "《商标许可协议》已签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@2.7/案名审批已完成\n2、@1.1/《商标许可协议》已签署"
  },
  {
    "name": "制定会员体系建设策略",
    "level": 2,
    "profession": "客关",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "客关负责人已到岗；",
        "type": "prerequisite"
      },
      {
        "node": "项目定位及@3.1/招商策略报告已完成；",
        "type": "prerequisite"
      },
      {
        "node": "开业时间已确定；",
        "type": "prerequisite"
      },
      {
        "node": "开办费预算审批已完成。",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.17/客关负责人已到岗；\n2、@2.4/项目定位及@3.1/招商策略报告已完成；\n3、@4.86/开业时间已确定；\n4、@4.89/开办费预算审批已完成。"
  },
  {
    "name": "签署《万达通积分协议》，完成一点万象、小程序上线。",
    "level": 2,
    "profession": "客关",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [],
    "offset_remark": "",
    "dependency_remark": "无"
  },
  {
    "name": "制定会员招募计划",
    "level": 2,
    "profession": "客关",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "客关负责人已到岗；",
        "type": "prerequisite"
      },
      {
        "node": "项目定位及@3.1/招商策略报告已完成；",
        "type": "prerequisite"
      },
      {
        "node": "开业时间已确定；",
        "type": "prerequisite"
      },
      {
        "node": "开办费预算审批已完成。",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.17/客关负责人已到岗；\n2、@2.4/项目定位及@3.1/招商策略报告已完成；\n3、@4.86/开业时间已确定；\n4、@4.89/开办费预算审批已完成。"
  },
  {
    "name": "服务点位提资与落地",
    "level": 2,
    "profession": "客关",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "客关负责人已到岗；",
        "type": "prerequisite"
      },
      {
        "node": "项目定位已确认；",
        "type": "prerequisite"
      },
      {
        "node": "3、万达地产主责的前序设计阶段图纸已具备。",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.17/客关负责人已到岗；\n2、@2.4/项目定位已确认；\n3、万达地产主责的前序设计阶段图纸已具备。"
  },
  {
    "name": "开展预付卡业务（如需）",
    "level": 2,
    "profession": "客关",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "明确是否开展预付卡业务，并向属地城市政府备案",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "明确是否开展预付卡业务，并向属地城市政府备案"
  },
  {
    "name": "设立项目采购组织机构",
    "level": 2,
    "profession": "采购",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "建立项目《采购计划台账》",
    "level": 2,
    "profession": "采购",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "设立项目采购组织机构",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.70/设立项目采购组织机构"
  },
  {
    "name": "完成涉及采购计划事项的供应商考察及引入",
    "level": 2,
    "profession": "采购",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "编制各采购计划事项涉及新入库供方《供应商考察报告》",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "编制各采购计划事项涉及新入库供方《供应商考察报告》"
  },
  {
    "name": "完成《信息化建设整体方案》",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责提供机电图初稿",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责提供机电图初稿"
  },
  {
    "name": "信息化基础建设以及信息化网络建设",
    "level": 1,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "基于万达地产确认的信息化建设整体方案，进行信息化建设提资，万达地产确认提资清单",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.73/基于万达地产确认的信息化建设整体方案，进行信息化建设提资，万达地产确认提资清单"
  },
  {
    "name": "确认运营商通讯信号全覆盖",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的信号覆盖工作完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的信号覆盖工作完成"
  },
  {
    "name": "WiFi系统线路铺设、设备安装、效果调试完成",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产主责的信息化基础部分建设完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "万达地产主责的信息化基础部分建设完成"
  },
  {
    "name": "确认客流系统的线路铺设、设备安装、精度调试完成",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "信息化基础建设完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.74/信息化基础建设完成"
  },
  {
    "name": "地图中台-项目空间地图绘制实施",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管软件系统授权协议包含地图中台",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产主责提供定稿的CAD图纸（包括铺位、多经点位、设备设施）",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@1.1/商管软件系统授权协议包含地图中台\n2、万达地产主责提供定稿的CAD图纸（包括铺位、多经点位、设备设施）"
  },
  {
    "name": "信息化前介",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "推广部门给出信息化前介必要的项目基础信息",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "推广部门给出信息化前介必要的项目基础信息"
  },
  {
    "name": "信息团队组建以及信息业务系统初始化",
    "level": 2,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [],
    "offset_remark": "",
    "dependency_remark": "无"
  },
  {
    "name": "POS系统上线",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1.确认项目收单行、POS到位",
        "type": "prerequisite"
      },
      {
        "node": "2.财务系统初始化完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1.确认项目收单行、POS到位\n2.财务系统初始化完成"
  },
  {
    "name": "停车系统上线和验证（会员权益等）",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "1.万达地产主责的道闸系统采购完成；",
        "type": "prerequisite"
      },
      {
        "node": "2.会员体系建设策略完成；",
        "type": "prerequisite"
      },
      {
        "node": "3.财务系统初始化完成；",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1.万达地产主责的道闸系统采购完成；\n2.会员体系建设策略完成；\n3.财务系统初始化完成；"
  },
  {
    "name": "信息筹备向万达地产备案",
    "level": 3,
    "profession": "信息",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前2-3天",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前2-3天"
  },
  {
    "name": "收取商管软件系统首年许可费",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管软件系统授权协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/商管软件系统授权协议签署"
  },
  {
    "name": "项目会议体系及万达地产服务策略建立",
    "level": 2,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "与万达地产确定预计开业日",
    "level": 0,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "在合同约定的最晚开业日前至少提前18个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/在合同约定的最晚开业日前至少提前18个月"
  },
  {
    "name": "完成《开业筹备运营专项计划》编制",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "与万达地产确认预计开业日",
        "type": "prerequisite"
      },
      {
        "node": "商业公司总经理到岗后",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@4.86/与万达地产确认预计开业日\n2、@5.8/商业公司总经理到岗后"
  },
  {
    "name": "与万达地产召开项目开业筹备会",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前1年",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前1年"
  },
  {
    "name": "《购物中心开业筹备预算方案》提交，万达地产确认并资金到账",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "组织召开开业冲刺会",
    "level": 2,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前3个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前3个月"
  },
  {
    "name": "完成开业时间内部评估",
    "level": 2,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前2月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前2月"
  },
  {
    "name": "收回万达地产消防验收证明（一消）",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产完成消防验收",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.92/万达地产完成消防验收"
  },
  {
    "name": "万达地产完成整体竣工验收，并收回万达地产竣工备案证明",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产完成竣工验收",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.93/万达地产完成竣工验收"
  },
  {
    "name": "收回购物中心不动产产权查档资料",
    "level": 2,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前完成"
  },
  {
    "name": "购物中心移交商业公司管理",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业前完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业前完成"
  },
  {
    "name": "试营业（如有）日期确认",
    "level": 2,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "确认试营业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "确认试营业"
  },
  {
    "name": "试营业（如有）",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "确认试营业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "确认试营业"
  },
  {
    "name": "开业",
    "level": 0,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "接收万达地产承接查验纸质资料",
        "type": "prerequisite"
      },
      {
        "node": "确认万达地产完成承接查验问题整改",
        "type": "prerequisite"
      },
      {
        "node": "完成开业前安全检查，出具检查报告及隐患整改清单",
        "type": "prerequisite"
      },
      {
        "node": "收回万达地产消防验收证明（一消）",
        "type": "prerequisite"
      },
      {
        "node": "万达地产完成整体竣工验收，并收回万达地产竣工备案证明",
        "type": "prerequisite"
      },
      {
        "node": "@4.18-4.26/各类场地及功能移交完成",
        "type": "prerequisite"
      },
      {
        "node": "收回购物中心不动产产权查档资料",
        "type": "prerequisite"
      },
      {
        "node": "商业公司与万达地产、项目所在综合体物业公司共同签署物业管理界面分割协议",
        "type": "prerequisite"
      },
      {
        "node": "万达地产或商业公司完成项目保险购买",
        "type": "prerequisite"
      },
      {
        "node": "商业公司签署加入商管协议、商标许可协议、商管软件系统授权许可协议的承诺函",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.28/接收万达地产承接查验纸质资料\n@4.31/确认万达地产完成承接查验问题整改\n@4.10/完成开业前安全检查，出具检查报告及隐患整改清单\n@4.92/收回万达地产消防验收证明（一消）\n@4.93/万达地产完成整体竣工验收，并收回万达地产竣工备案证明\n@4.18-4.26/各类场地及功能移交完成\n@4.94/收回购物中心不动产产权查档资料\n@5.6/商业公司与万达地产、项目所在综合体物业公司共同签署物业管理界面分割协议\n@5.23/万达地产或商业公司完成项目保险购买\n@5.3/商业公司签署加入商管协议、商标许可协议、商管软件系统授权许可协议的承诺函"
  },
  {
    "name": "向万达地产备案开业简报",
    "level": 3,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业"
  },
  {
    "name": "开业后项目全面完成接收",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产遗留问题全部整改完成",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.31/万达地产遗留问题全部整改完成"
  },
  {
    "name": "开业后评估暨产品力复盘会",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "开业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/开业"
  },
  {
    "name": "万达地产设立商业公司",
    "level": 9,
    "profession": "商业项目经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "万达地产确认预计开业日",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.86/万达地产确认预计开业日"
  },
  {
    "name": "制定法律服务方案，选聘项目律师",
    "level": 1,
    "profession": "法务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "商业公司签署加入商管协议、商标许可协议、商管软件系统授权许可协议的承诺函",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "前置需商业公司完成设立及印章刻制",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/前置需商业公司完成设立及印章刻制"
  },
  {
    "name": "我方收到万达地产连带最高额保证的决议文件",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "前置需商业公司完成设立及印章刻制",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/前置需商业公司完成设立及印章刻制"
  },
  {
    "name": "商业公司及万达地产签署购物中心整租协议",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "前置需商业公司完成设立及印章刻制",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/前置需商业公司完成设立及印章刻制"
  },
  {
    "name": "商业公司与万达地产、项目所在综合体物业公司共同签署物业管理界面分割协议",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立后",
        "type": "prerequisite"
      },
      {
        "node": "2、万达地产选聘大物业前完成",
        "type": "prerequisite"
      },
      {
        "node": "最迟不晚于开业日前9个月",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "1、@5.1/商业公司设立后\n2、万达地产选聘大物业前完成\n3、@4.98/最迟不晚于开业日前9个月"
  },
  {
    "name": "收到甲方代表授权书",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商管服务协议签署",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/商管服务协议签署"
  },
  {
    "name": "正式任命商业公司总经理，取得万达地产授权后收取服务费",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "商业公司资料交割",
    "level": 1,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "临时办公区启用",
    "level": 3,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "正式办公室启用",
    "level": 3,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "提交人事及行政管理制度",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "设立人事账户（如有）",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司资料交割",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.9/商业公司资料交割"
  },
  {
    "name": "提交人员编制及到岗计划编制",
    "level": 1,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "提交人工成本及行政费用预算编制",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "提交第三方人事外包公司招采计划",
    "level": 2,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "任命门店部门负责人",
    "level": 1,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司总经理到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.8/商业公司总经理到岗"
  },
  {
    "name": "人才盘点与标准套改（如有）",
    "level": 3,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "门店部门负责人到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.17/门店部门负责人到岗"
  },
  {
    "name": "招聘到岗率90%",
    "level": 3,
    "profession": "综合",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "门店部门负责人到岗",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.17/门店部门负责人到岗"
  },
  {
    "name": "收取第一笔商标许可使用费",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "购物中心开业",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@4.98/购物中心开业"
  },
  {
    "name": "完成商业财务核算系统上线",
    "level": 2,
    "profession": "财务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "签署《商管软件系统授权许可协议》且明确财务系统范围",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@1.1/签署《商管软件系统授权许可协议》且明确财务系统范围"
  },
  {
    "name": "确定银行卡收单机构",
    "level": 2,
    "profession": "财务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "出具保险方案，并确认万达地产或商业公司完成项目保险购买",
    "level": 1,
    "profession": "财务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "设立营运账户",
    "level": 2,
    "profession": "财务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "设立押金账户，万达地产确认后到账资金",
    "level": 9,
    "profession": "商业公司总经理",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  },
  {
    "name": "开立储备金专户",
    "level": 2,
    "profession": "财务",
    "acceptance_standard": {
      "默认验收标准": {
        "enabled": true,
        "deadline": null
      }
    },
    "baseline": "开业",
    "offset_days": 0,
    "duration_days": 7,
    "dependencies": [
      {
        "node": "商业公司设立",
        "type": "prerequisite"
      }
    ],
    "offset_remark": "",
    "dependency_remark": "@5.1/商业公司设立"
  }
]
