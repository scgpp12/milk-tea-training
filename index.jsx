import { useState, useEffect, useRef } from "react";

// ─────────────────────────────────────────────────────────────────────────────
// DRINK DATA  — 无价格 / 按更新日志修正
// ─────────────────────────────────────────────────────────────────────────────
const DRINKS = [
  // ══ Exclusive Bobo ═══════════════════════════════════════════════════════════
  {
    id: 1, category: "Exclusive Bobo",
    chineseName: "西瓜啵啵椰", englishName: "Watermelon Bobo Coco",
    cupSize: "700ml", sugarOptions: ["无糖"],
    description: "无额外加糖；无咖啡因",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "西瓜块 200g" },
      { vessel: "shaker", text: "Coco椰汁 100ml" },
      { vessel: "shaker", text: "加冰（少冰：换成 50ml water 代替冰）" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：用 50ml water 代替冰块", noIce: "去冰：不加冰，加 50ml water" },
    toppings: ["啵啵（已含）"],
  },
  {
    id: 2, category: "Exclusive Bobo",
    chineseName: "芒果啵啵椰", englishName: "Mango Bobo Coco",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "手打芒果 + 椰汁底",
    steps: [
      { vessel: "cup",    text: "杯底加入芒果碎 120g" },
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "芒果果酱 一勺" },
      { vessel: "shaker", text: "Tea 120ml（少冰：150ml）" },
      { vessel: "shaker", text: "Coco椰汁 80ml（少冰：100ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 120ml；Coco 80ml", less: "少冰：Tea 150ml；Coco 100ml", noIce: "去冰：Tea 150ml；Coco 100ml；不加冰" },
    toppings: ["啵啵（已含）"],
  },
  {
    id: 3, category: "Exclusive Bobo",
    chineseName: "草莓啵啵椰", englishName: "Strawberry Bobo Coco",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "手打草莓 + 椰汁底",
    steps: [
      { vessel: "cup",    text: "杯底加入草莓碎 120g" },
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "草莓果酱 一勺" },
      { vessel: "shaker", text: "Tea 120ml（少冰：150ml）" },
      { vessel: "shaker", text: "Coco椰汁 80ml（少冰：100ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 120ml；Coco 80ml", less: "少冰：Tea 150ml；Coco 100ml", noIce: "去冰：Tea 150ml；Coco 100ml；不加冰" },
    toppings: ["啵啵（已含）"],
  },
  {
    id: 4, category: "Exclusive Bobo",
    chineseName: "芒果啵啵", englishName: "Mango Bobo",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "手打芒果 + 绿茶底，可加奶盖",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加入芒果碎 120g" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "芒果果酱 一勺" },
      { vessel: "shaker", text: "Tea 200ml（少冰：250ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 200ml", less: "少冰：Tea 250ml", noIce: "去冰：Tea 250ml；不加冰" },
    toppings: ["啵啵（已含）", "奶盖（选加）"],
  },
  {
    id: 5, category: "Exclusive Bobo",
    chineseName: "草莓啵啵", englishName: "Strawberry Bobo",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "手打草莓 + 绿茶底，可加奶盖",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加入草莓碎 120g" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "草莓果酱 一勺" },
      { vessel: "shaker", text: "Tea 200ml（少冰：250ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 200ml", less: "少冰：Tea 250ml", noIce: "去冰：Tea 250ml；不加冰" },
    toppings: ["啵啵（已含）", "奶盖（选加）"],
  },
  {
    id: 6, category: "Exclusive Bobo",
    chineseName: "奇异果啵啵", englishName: "Kiwi Bobo",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "整个奇异果捣碎 + 绿茶底 + 奶盖",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加入 2个奇异果，捣碎" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "奇异果果酱 一勺" },
      { vessel: "shaker", text: "Tea 200ml（少冰：250ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 200ml", less: "少冰：Tea 250ml", noIce: "去冰：Tea 250ml；不加冰" },
    toppings: ["啵啵（已含）", "奶盖（选加）"],
  },
  {
    id: 7, category: "Exclusive Bobo",
    chineseName: "菠萝百香果啵啵", englishName: "Pineapple Passion Bobo",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "手打菠萝 + 百香果酱 + 绿茶底",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "加入菠萝碎 120g，捣碎" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "百香果酱 一勺" },
      { vessel: "shaker", text: "Tea 200ml（少冰：250ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "正常加冰；Tea 200ml", less: "少冰：Tea 250ml", noIce: "去冰：Tea 250ml；不加冰" },
    toppings: ["啵啵（已含）"],
  },
  {
    id: 8, category: "Exclusive Bobo",
    chineseName: "白月光青柠啵啵", englishName: "Lime Bobo Coco",
    cupSize: "700ml", sugarOptions: ["无糖", "无咖啡因"],
    description: "无添加糖；无咖啡因；⚠️ 建议20分钟内饮用",
    steps: [
      { vessel: "cup",    text: "杯底加入啵啵 一勺" },
      { vessel: "shaker", text: "青柠 4片，捣碎" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "Coco椰汁 300ml（少冰：350ml）" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
      { vessel: "note",   text: "⚠️ 含青柠，建议告知顾客20分钟内饮用", isWarning: true },
    ],
    lessIce: { full: "正常加冰；Coco 300ml", less: "少冰：Coco 350ml", noIce: "去冰：Coco 350ml；不加冰" },
    toppings: ["啵啵（已含）"],
  },

  // ══ Fresh Fruit Tea ═══════════════════════════════════════════════════════════
  // 【更新 20260314】鲜橙冻冻 — 全新配方：桂花冻 + 四片橙铺底 + 不加糖
  {
    id: 29, category: "Fresh Fruit Tea",
    chineseName: "鲜橙冻冻", englishName: "Fresh Orange Dongdong",
    cupSize: "700ml", sugarOptions: ["无糖（不加糖）"],
    description: "⚠️ 不加糖；桂花冻打底 + 四片橙铺底 + orange syrup + 到冰550",
    steps: [
      { vessel: "cup",    text: "杯底加入桂花冻" },
      { vessel: "cup",    text: "四片橙子铺底" },
      { vessel: "shaker", text: "橙汁 150ml" },
      { vessel: "shaker", text: "Tea 150ml（少冰：200ml）" },
      { vessel: "shaker", text: "Orange syrup 适量" },
      { vessel: "shaker", text: "加冰至 550ml" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
      { vessel: "note",   text: "⚠️ 不加糖，请勿额外加糖", isWarning: true },
    ],
    lessIce: { full: "到冰 550ml", less: "少冰：Tea 200ml；到冰约 500ml", noIce: "去冰：不加冰" },
    toppings: ["桂花冻（已含）"],
  },
  {
    id: 9, category: "Fresh Fruit Tea",
    chineseName: "超级水果", englishName: "Super Fruit Tea",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "双柠压汁 + 橙片/西柚片装饰 + 西瓜汁补满",
    steps: [
      { vessel: "cup",    text: "奶茶杯：2个青柠 + 2个柠檬，入杯压汁" },
      { vessel: "cup",    text: "1片橙子 + 1片西柚，入杯贴杯壁" },
      { vessel: "shaker", text: "加糖 20g（半糖：10g）" },
      { vessel: "shaker", text: "百香果酱 一勺" },
      { vessel: "shaker", text: "Tea 250ml（少冰：300ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
      { vessel: "cup",    text: "加入西瓜汁补至满杯" },
    ],
    lessIce: { full: "正常加冰；Tea 250ml", less: "少冰：Tea 300ml", noIce: "去冰：Tea 300ml；不加冰" },
    toppings: ["无"],
  },
  {
    id: 10, category: "Fresh Fruit Tea",
    chineseName: "暴打西瓜柠檬", englishName: "Watermelon Lime",
    cupSize: "700ml", sugarOptions: ["全糖 45g", "半糖 35g"],
    description: "⚠️ 含青柠，建议20分钟内饮用",
    steps: [
      { vessel: "shaker", text: "西瓜块 140g + 柠檬 2片，捣碎" },
      { vessel: "shaker", text: "加糖 45g（半糖：35g）" },
      { vessel: "shaker", text: "Tea 200ml（少冰：250ml）" },
      { vessel: "shaker", text: "加冰" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，装杯" },
      { vessel: "note",   text: "⚠️ 含青柠，建议告知顾客20分钟内饮用", isWarning: true },
    ],
    lessIce: { full: "正常加冰；Tea 200ml", less: "少冰：Tea 250ml", noIce: "去冰：Tea 250ml；不加冰" },
    toppings: ["无"],
  },
  // 【更新 20260314】满杯西柚 — 新增西柚粒；糖量更新为 20/30g；到冰 600
  {
    id: 12, category: "Fresh Fruit Tea",
    chineseName: "满杯西柚", englishName: "Full Cup Grapefruit",
    cupSize: "700ml", sugarOptions: ["全糖 30g", "半糖 20g"],
    description: "3/4西柚片贴壁 + 1勺西柚粒 + 到冰 600",
    steps: [
      { vessel: "cup",    text: "西柚片 3/4 贴杯壁" },
      { vessel: "cup",    text: "西柚粒 1勺" },
      { vessel: "shaker", text: "西柚汁水 150ml" },
      { vessel: "shaker", text: "Tea 150ml（少冰：200ml）" },
      { vessel: "shaker", text: "Grapefruit syrup 适量" },
      { vessel: "shaker", text: "加糖 30g（半糖：20g）" },
      { vessel: "shaker", text: "加冰至 600ml" },
      { vessel: "shaker", text: "放入 Shaker，前后摇匀，倒入奶茶杯" },
    ],
    lessIce: { full: "到冰 600ml；Tea 150ml", less: "少冰：Tea 200ml；到冰约 550ml", noIce: "去冰：Tea 200ml；不加冰" },
    toppings: ["西柚粒（已含）"],
  },
  {
    id: 13, category: "Fresh Fruit Tea",
    chineseName: "草莓酒酿冰奶", englishName: "Strawberry Fermented Rice Milk",
    cupSize: "700ml", sugarOptions: ["无糖", "无咖啡因"],
    description: "无咖啡因；含微量酒精（0.5%vol）",
    steps: [
      { vessel: "cup",    text: "出品杯：杯底加入草莓块 120g" },
      { vessel: "cup",    text: "米酒娘 3勺" },
      { vessel: "cup",    text: "Heavy Cream 30ml" },
      { vessel: "shaker", text: "小shaker：草莓果糖浆 一勺 + 无乳糖牛奶 200ml（少冰：250ml）搅拌" },
      { vessel: "cup",    text: "加冰至满，出杯" },
      { vessel: "note",   text: "⚠️ 无咖啡因；含微量酒精（0.5%vol）需告知顾客", isWarning: true },
    ],
    lessIce: { full: "正常加冰；牛奶 200ml", less: "少冰：牛奶 250ml", noIce: "去冰：牛奶 250ml；不加冰" },
    toppings: ["无"],
  },

  // ══ Cheese Foam Slush ════════════════════════════════════════════════════════
  {
    id: 14, category: "Cheese Foam Slush",
    chineseName: "芝芝芒芒", englishName: "Mango Cheese Slush",
    cupSize: "700ml", sugarOptions: ["全糖 40g", "半糖 30g"],
    description: "芒果 Blender 打碎 + 奶盖",
    steps: [
      { vessel: "cup",     text: "奶茶杯：芒果块 40g 捣碎" },
      { vessel: "blender", text: "芒果块 80g" },
      { vessel: "blender", text: "芒果果酱 一勺" },
      { vessel: "blender", text: "糖 40g（半糖：30g）" },
      { vessel: "blender", text: "Tea 150ml" },
      { vessel: "blender", text: "加冰" },
      { vessel: "blender", text: "Blender 搅拌，全部倒入奶茶杯" },
      { vessel: "cup",     text: "奶盖加满杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：减少blender冰量", noIce: "去冰：不加冰，奶昔会更稀" },
    toppings: ["奶盖（已含）"],
  },
  {
    id: 15, category: "Cheese Foam Slush",
    chineseName: "芝芝草莓", englishName: "Strawberry Cheese Slush",
    cupSize: "700ml", sugarOptions: ["全糖 30g", "半糖 20g"],
    description: "草莓 Blender 打碎 + 奶盖",
    steps: [
      { vessel: "cup",     text: "奶茶杯：草莓块 40g 捣碎" },
      { vessel: "blender", text: "草莓块 80g" },
      { vessel: "blender", text: "草莓果酱 一勺" },
      { vessel: "blender", text: "糖 30g（半糖：20g）" },
      { vessel: "blender", text: "Tea 150ml" },
      { vessel: "blender", text: "加冰" },
      { vessel: "blender", text: "Blender 搅拌，全部倒入奶茶杯" },
      { vessel: "cup",     text: "奶盖加满杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：减少blender冰量", noIce: "去冰：不加冰" },
    toppings: ["奶盖（已含）"],
  },
  {
    id: 16, category: "Cheese Foam Slush",
    chineseName: "芝芝黑提", englishName: "Black Grape Cheese Slush",
    cupSize: "700ml", sugarOptions: ["全糖 20g", "半糖 10g"],
    description: "黑提 Blender 打碎 + 奶盖",
    steps: [
      { vessel: "blender", text: "黑提块 120g" },
      { vessel: "blender", text: "黑提果酱 一勺" },
      { vessel: "blender", text: "糖 20g（半糖：10g）" },
      { vessel: "blender", text: "Tea 150ml" },
      { vessel: "blender", text: "加冰" },
      { vessel: "blender", text: "Blender 搅拌，全部倒入奶茶杯" },
      { vessel: "cup",     text: "奶盖加满杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：减少blender冰量", noIce: "去冰：不加冰" },
    toppings: ["奶盖（已含）"],
  },
  {
    id: 17, category: "Cheese Foam Slush",
    chineseName: "芝芝西瓜", englishName: "Watermelon Cheese Slush",
    cupSize: "700ml", sugarOptions: ["无糖", "无咖啡因"],
    description: "西瓜 + 桃子果酱 Blender + 奶盖；无添加糖；无咖啡因",
    steps: [
      { vessel: "blender", text: "西瓜 300g" },
      { vessel: "blender", text: "桃子果酱 一勺" },
      { vessel: "blender", text: "加冰" },
      { vessel: "blender", text: "Blender 搅拌，全部倒入奶茶杯" },
      { vessel: "cup",     text: "奶盖加满杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：减少blender冰量", noIce: "去冰：不加冰；无咖啡因" },
    toppings: ["奶盖（已含）"],
  },
  {
    id: 18, category: "Cheese Foam Slush",
    chineseName: "杨枝甘露", englishName: "Mango Sago",
    cupSize: "700ml", sugarOptions: ["按需加糖"],
    description: "芒果碎 + 米西 + 椰奶底；Blender 打碎 + 西柚果肉补满",
    steps: [
      { vessel: "cup",     text: "出品杯：芒果碎 40g" },
      { vessel: "cup",     text: "米西（西米）一勺" },
      { vessel: "cup",     text: "Coco Milk 50ml" },
      { vessel: "blender", text: "芒果块 80g" },
      { vessel: "blender", text: "Mango Syrup 一勺" },
      { vessel: "blender", text: "按需加糖" },
      { vessel: "blender", text: "Tea 150ml" },
      { vessel: "blender", text: "加冰，搅拌机搅拌" },
      { vessel: "cup",     text: "将 Blender 内容全部倒入出品杯" },
      { vessel: "cup",     text: "倒入西柚果肉补至满杯，出杯" },
    ],
    lessIce: { full: "正常加冰", less: "少冰：减少blender冰量", noIce: "去冰：不加冰" },
    toppings: ["米西（已含）", "西柚果肉（已含）"],
  },

  // ══ Milk Tea ══════════════════════════════════════════════════════════════════
  {
    id: 19, category: "Milk Tea",
    chineseName: "珍珠奶茶 500ml", englishName: "Classic Bubble Tea 500ml",
    cupSize: "500ml", sugarOptions: ["按糖表"],
    description: "经典珍珠奶茶",
    steps: [
      { vessel: "cup", text: "珍珠 一勺" },
      { vessel: "cup", text: "奶茶 250ml（少冰：300ml）" },
      { vessel: "cup", text: "加冰满杯" },
    ],
    lessIce: { full: "正常加冰；奶茶 250ml", less: "少冰：奶茶 300ml", noIce: "去冰：奶茶 300ml；不加冰" },
    toppings: ["珍珠（已含）", "布丁", "仙草"],
  },
  {
    id: 20, category: "Milk Tea",
    chineseName: "珍珠奶茶 700ml", englishName: "Classic Bubble Tea 700ml",
    cupSize: "700ml", sugarOptions: ["按糖表"],
    description: "经典珍珠奶茶",
    steps: [
      { vessel: "cup", text: "珍珠 一勺" },
      { vessel: "cup", text: "奶茶 350ml（少冰：400ml）" },
      { vessel: "cup", text: "加冰满杯" },
    ],
    lessIce: { full: "正常加冰；奶茶 350ml", less: "少冰：奶茶 400ml", noIce: "去冰：奶茶 400ml；不加冰" },
    toppings: ["珍珠（已含）", "布丁", "仙草"],
  },
  {
    id: 21, category: "Milk Tea",
    chineseName: "桂花乌龙鲜奶茶", englishName: "Osmanthus Oolong Milk Tea",
    cupSize: "700ml", sugarOptions: ["全糖 30g", "半糖 20g", "30%糖 10g", "无糖 0g"],
    description: "桂花冻 + 桂花乌龙茶 + 混合奶；搅拌机打6秒",
    steps: [
      { vessel: "cup",    text: "出品杯底加入桂花冻 100g" },
      { vessel: "shaker", text: "新搅拌杯：桂花乌龙茶 200ml（少冰：+50ml = 250ml）" },
      { vessel: "shaker", text: "混合奶：牛奶 70ml + 咖奶（Evaporated Milk）30ml" },
      { vessel: "shaker", text: "按糖表加糖（全糖30g / 半糖20g / 30%糖10g / 无糖0g）" },
      { vessel: "shaker", text: "新搅拌机打 6秒" },
      { vessel: "cup",    text: "倒入奶茶杯，加冰块，出品" },
    ],
    lessIce: { full: "正常加冰；乌龙茶 200ml", less: "少冰：乌龙茶 250ml", noIce: "去冰：乌龙茶 250ml；不加冰" },
    toppings: ["桂花冻（已含）", "珍珠"],
  },
  {
    id: 22, category: "Milk Tea",
    chineseName: "白桃乌龙鲜奶茶", englishName: "Peach Oolong Fresh Milk Tea",
    cupSize: "700ml", sugarOptions: ["全糖 30g", "半糖 20g", "30%糖 10g", "无糖 0g"],
    description: "桂花冻 + 白桃乌龙茶 + 混合奶；搅拌机打6秒",
    steps: [
      { vessel: "cup",    text: "出品杯底加入桂花冻 100g" },
      { vessel: "shaker", text: "新搅拌杯：白桃乌龙茶 200ml（少冰：+50ml = 250ml）" },
      { vessel: "shaker", text: "混合奶：牛奶 70ml + 咖奶（Evaporated Milk）30ml" },
      { vessel: "shaker", text: "按糖表加糖（全糖30g / 半糖20g / 30%糖10g / 无糖0g）" },
      { vessel: "shaker", text: "新搅拌机打 6秒" },
      { vessel: "cup",    text: "倒入奶茶杯，加冰块，出品" },
    ],
    lessIce: { full: "正常加冰；乌龙茶 200ml", less: "少冰：乌龙茶 250ml", noIce: "去冰：乌龙茶 250ml；不加冰" },
    toppings: ["桂花冻（已含）", "珍珠"],
  },
  {
    id: 23, category: "Milk Tea",
    chineseName: "紫薯奶茶 500ml", englishName: "Purple Yam Milk 500ml",
    cupSize: "500ml", sugarOptions: ["按需"],
    description: "手捣紫薯贴杯壁；无粉末；口感有颗粒感，首次顾客须告知",
    steps: [
      { vessel: "cup", text: "紫薯 三大勺，贴杯壁" },
      { vessel: "cup", text: "冰块 4-6 块" },
      { vessel: "cup", text: "补满 Milk（有机牛奶 或 无乳糖牛奶）" },
      { vessel: "note", text: "⚠️ 手捣紫薯会有颗粒感，首次顾客必须提供试饮或告知", isWarning: true },
    ],
    lessIce: { full: "4-6块冰", less: "少冰：2-3块冰", noIce: "去冰：不加冰，多补一点牛奶" },
    toppings: ["珍珠（选加）"],
  },
  {
    id: 24, category: "Milk Tea",
    chineseName: "桂花酒酿冰奶 700ml", englishName: "Osmanthus Fermented Rice Milk 700ml",
    cupSize: "700ml", sugarOptions: ["无糖", "无咖啡因"],
    description: "无咖啡因；含微量酒精（0.5%vol）",
    steps: [
      { vessel: "cup", text: "出品杯底加入桂花冻" },
      { vessel: "cup", text: "米酒娘 3勺" },
      { vessel: "cup", text: "Heavy Cream 30ml" },
      { vessel: "cup", text: "无乳糖牛奶 200ml（少冰：250ml）" },
      { vessel: "cup", text: "加冰至满，出杯" },
      { vessel: "note", text: "⚠️ 无咖啡因；含微量酒精（0.5%vol）需告知顾客", isWarning: true },
    ],
    lessIce: { full: "正常加冰；牛奶 200ml", less: "少冰：牛奶 250ml", noIce: "去冰：牛奶 250ml；不加冰" },
    toppings: ["桂花冻（已含）"],
  },
  {
    id: 25, category: "Milk Tea",
    chineseName: "桂花酒酿冰奶 500ml", englishName: "Osmanthus Fermented Rice Milk 500ml",
    cupSize: "500ml", sugarOptions: ["无糖", "无咖啡因"],
    description: "无咖啡因；含微量酒精（0.5%vol）",
    steps: [
      { vessel: "cup", text: "出品杯底加入桂花冻" },
      { vessel: "cup", text: "米酒娘 3勺" },
      { vessel: "cup", text: "Heavy Cream 30ml" },
      { vessel: "cup", text: "无乳糖牛奶 150ml（少冰：200ml）" },
      { vessel: "cup", text: "加冰至满，出杯" },
      { vessel: "note", text: "⚠️ 无咖啡因；含微量酒精（0.5%vol）需告知顾客", isWarning: true },
    ],
    lessIce: { full: "正常加冰；牛奶 150ml", less: "少冰：牛奶 200ml", noIce: "去冰：牛奶 200ml；不加冰" },
    toppings: ["桂花冻（已含）"],
  },
  // 【更新 20260314】Pink Salt 鲜奶绿 — 分中杯(500ml)/大杯(700ml) 两个规格
  {
    id: 26, category: "Milk Tea",
    chineseName: "海盐芝士鲜奶绿 中杯 (Pink Salt M)", englishName: "Pink Salt Fresh Green Milk Tea 500ml",
    cupSize: "500ml（用700ml杯做）", sugarOptions: ["按糖表"],
    description: "黑珍珠底 + 无乳糖牛奶 + 淡奶 + 绿茶 + 粉盐 + 奶盖",
    steps: [
      { vessel: "cup",    text: "出品杯（700ml杯）：黑珍珠 1勺" },
      { vessel: "shaker", text: "淡奶（Evaporated Milk）50ml" },
      { vessel: "shaker", text: "无乳糖牛奶 100ml" },
      { vessel: "shaker", text: "绿茶 100ml（少冰：150ml）" },
      { vessel: "shaker", text: "按糖表加糖" },
      { vessel: "shaker", text: "粉盐（Pink Salt）一点点" },
      { vessel: "shaker", text: "搅拌均匀" },
      { vessel: "cup",    text: "倒入出品杯" },
      { vessel: "cup",    text: "加冰至满杯" },
      { vessel: "cup",    text: "加奶盖（Cheese Foam）" },
    ],
    lessIce: { full: "正常加冰；绿茶 100ml", less: "少冰：绿茶 150ml", noIce: "去冰：绿茶 150ml；不加冰" },
    toppings: ["黑珍珠（已含）", "奶盖（已含）"],
  },
  {
    id: 30, category: "Milk Tea",
    chineseName: "海盐芝士鲜奶绿 大杯 (Pink Salt L)", englishName: "Pink Salt Fresh Green Milk Tea 700ml",
    cupSize: "700ml", sugarOptions: ["按糖表"],
    description: "黑珍珠底 + 无乳糖牛奶 + 淡奶 + 绿茶 + 粉盐 + 奶盖",
    steps: [
      { vessel: "cup",    text: "出品杯：黑珍珠 1勺" },
      { vessel: "shaker", text: "淡奶（Evaporated Milk）70ml" },
      { vessel: "shaker", text: "无乳糖牛奶 150ml" },
      { vessel: "shaker", text: "绿茶 150ml（少冰：200ml）" },
      { vessel: "shaker", text: "按糖表加糖" },
      { vessel: "shaker", text: "粉盐（Pink Salt）一点点" },
      { vessel: "shaker", text: "搅拌均匀" },
      { vessel: "cup",    text: "倒入出品杯" },
      { vessel: "cup",    text: "加冰至满杯" },
      { vessel: "cup",    text: "加奶盖（Cheese Foam）" },
    ],
    lessIce: { full: "正常加冰；绿茶 150ml", less: "少冰：绿茶 200ml", noIce: "去冰：绿茶 200ml；不加冰" },
    toppings: ["黑珍珠（已含）", "奶盖（已含）"],
  },

  // ══ Coffee ════════════════════════════════════════════════════════════════════
  // 【更新 20260314】咖啡：18.7g咖啡豆，每次必须称量，36g出杯约36秒
  {
    id: 27, category: "Coffee",
    chineseName: "鲜橙C拿铁 500ml", englishName: "Sparkling Orange Latte 500ml",
    cupSize: "500ml", sugarOptions: ["无糖"],
    description: "橙片贴壁 + 鲜橙C汽水 + 咖啡",
    steps: [
      { vessel: "cup",  text: "橙子 2片，贴壁打底" },
      { vessel: "cup",  text: "鲜橙C汽水 200ml" },
      { vessel: "cup",  text: "加块冰" },
      { vessel: "cup",  text: "咖啡豆 18.7g（每次必须称量）→ 萃取出 36g 咖啡，约 36 秒" },
      { vessel: "note", text: "⚠️ 咖啡豆每次必须称量 18.7g；出杯 36g；萃取时间约 36 秒", isWarning: true },
    ],
    lessIce: { full: "加一块冰", less: "少冰：不加冰", noIce: "去冰：不加冰" },
    toppings: ["无"],
  },
  {
    id: 28, category: "Coffee",
    chineseName: "鲜橙C拿铁 700ml", englishName: "Sparkling Orange Latte 700ml",
    cupSize: "700ml", sugarOptions: ["无糖"],
    description: "橙片贴壁 + 鲜橙C汽水 + 咖啡",
    steps: [
      { vessel: "cup",  text: "橙子 4片，贴壁打底" },
      { vessel: "cup",  text: "鲜橙C汽水 330ml" },
      { vessel: "cup",  text: "加块冰" },
      { vessel: "cup",  text: "咖啡豆 18.7g（每次必须称量）→ 萃取出 36g 咖啡，约 36 秒" },
      { vessel: "note", text: "⚠️ 咖啡豆每次必须称量 18.7g；出杯 36g；萃取时间约 36 秒", isWarning: true },
    ],
    lessIce: { full: "加一块冰", less: "少冰：不加冰", noIce: "去冰：不加冰" },
    toppings: ["无"],
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// 开班备货清单
// ─────────────────────────────────────────────────────────────────────────────
const CHECKLIST_ITEMS = [
  { id: "menu",    text: "检查 menu availability（菜单上架状态）" },
  { id: "floor",   text: "拖地" },
  { id: "coffee",  text: "清洗咖啡机，检查咖啡机有水" },
  { id: "cups",    text: "补杯子 / 盖子 / 打包用品" },
  { id: "mango",   text: "芒果捣一整层七排" },
  { id: "straw",   text: "草莓捣 1排" },
  { id: "fruit",   text: "准备水果 slices（橙子/西柚/草莓等）" },
  { id: "kiwi",    text: "准备 5-10 个 kiwi 杯" },
  { id: "700cup",  text: "补满 700ml 杯子、厚椰乳、杯盖" },
  { id: "straw2",  text: "吸管摆上补满" },
  { id: "bobo",    text: "检查脆波波库存" },
  { id: "stock",   text: "检查所有货物储存量" },
  { id: "kitchen", text: "⚠️ 珍珠、茶冻、紫薯、芋头、西米 需 1-3 小时制作，提前通知厨房", isWarning: true },
];

const FRUIT_WEIGHTS = [
  { item: "草莓",  weight: "120g（不含杯重）" },
  { item: "芒果",  weight: "120g（不含杯重）" },
  { item: "葡萄",  weight: "120g + 20g 苹果（不含杯重）" },
  { item: "西瓜",  weight: "140g / 200g / 300g（需盖盖子）" },
  { item: "柿子",  weight: "半个或一个，60-80g" },
  { item: "奇异果", weight: "整个" },
];

// ─────────────────────────────────────────────────────────────────────────────
// 紧急联系
// ─────────────────────────────────────────────────────────────────────────────
const CONTACTS = [
  { name: "Haoran", role: "店长", phone: "(254) 214-9013", emoji: "👨‍💼" },
  { name: "Uber Eats Merchant Support", role: "外卖平台", phone: "(833) 275-3287", emoji: "🛵" },
  { name: "DoorDash Merchant Support", role: "外卖平台", phone: "(855) 222-8111", emoji: "🚗" },
];

// ─────────────────────────────────────────────────────────────────────────────
// CONSTANTS
// ─────────────────────────────────────────────────────────────────────────────
const CATEGORIES = ["All", "Exclusive Bobo", "Fresh Fruit Tea", "Cheese Foam Slush", "Milk Tea", "Coffee"];

const CAT = {
  "Exclusive Bobo":    { emoji: "🫧", badge: "bg-amber-500 text-white",   bg: "bg-amber-50",   border: "border-amber-200",   text: "text-amber-700",   ring: "ring-amber-400" },
  "Fresh Fruit Tea":   { emoji: "🍊", badge: "bg-emerald-500 text-white", bg: "bg-emerald-50", border: "border-emerald-200", text: "text-emerald-700", ring: "ring-emerald-400" },
  "Cheese Foam Slush": { emoji: "🧀", badge: "bg-yellow-500 text-white",  bg: "bg-yellow-50",  border: "border-yellow-200",  text: "text-yellow-700",  ring: "ring-yellow-400" },
  "Milk Tea":          { emoji: "🧋", badge: "bg-rose-500 text-white",    bg: "bg-rose-50",    border: "border-rose-200",    text: "text-rose-700",    ring: "ring-rose-400" },
  "Coffee":            { emoji: "☕", badge: "bg-stone-700 text-white",   bg: "bg-stone-100",  border: "border-stone-300",   text: "text-stone-700",   ring: "ring-stone-500" },
};
const M = c => CAT[c] || { emoji: "🍵", badge: "bg-gray-400 text-white", bg: "bg-gray-50", border: "border-gray-200", text: "text-gray-700", ring: "ring-gray-400" };

const VESSEL_STYLE = {
  cup:     { icon: "🥤", label: "出品杯",   bg: "bg-rose-50 border-rose-200",     dot: "bg-rose-400" },
  shaker:  { icon: "🧉", label: "Shaker杯", bg: "bg-blue-50 border-blue-200",     dot: "bg-blue-400" },
  blender: { icon: "⚡", label: "Blender",  bg: "bg-purple-50 border-purple-200", dot: "bg-purple-400" },
  note:    { icon: "⚠️", label: "注意",     bg: "bg-amber-50 border-amber-300",   dot: "bg-amber-500" },
};

function shuffle(a) { return [...a].sort(() => Math.random() - 0.5); }

// ─────────────────────────────────────────────────────────────────────────────
// NAV
// ─────────────────────────────────────────────────────────────────────────────
function Nav({ page, setPage }) {
  const [open, setOpen] = useState(false);
  const items = [
    { k: "home",      icon: "📋", label: "菜单" },
    { k: "simulate",  icon: "🎮", label: "模拟制作" },
    { k: "quiz",      icon: "🎯", label: "测验" },
    { k: "checklist", icon: "✅", label: "开班清单" },
    { k: "contacts",  icon: "📞", label: "联系" },
  ];
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-stone-200 shadow-sm">
      <div className="max-w-2xl mx-auto px-4 flex items-center justify-between h-14">
        <button onClick={() => setPage("home")} className="font-bold text-stone-800 text-lg flex items-center gap-2">
          <span className="text-2xl">🧋</span>
          <span className="hidden sm:inline">Rui Tea 培训手册</span>
          <span className="sm:hidden font-bold">Rui Tea</span>
        </button>
        <div className="hidden sm:flex gap-1">
          {items.map(n => (
            <button key={n.k} onClick={() => setPage(n.k)}
              className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${page === n.k ? "bg-amber-500 text-white" : "text-stone-600 hover:bg-stone-100"}`}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
        <button className="sm:hidden p-2 text-xl" onClick={() => setOpen(!open)}>{open ? "✕" : "☰"}</button>
      </div>
      {open && (
        <div className="sm:hidden border-t border-stone-100 px-4 pb-3 flex flex-col gap-1 bg-white">
          {items.map(n => (
            <button key={n.k} onClick={() => { setPage(n.k); setOpen(false); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium text-left ${page === n.k ? "bg-amber-500 text-white" : "text-stone-700 hover:bg-stone-100"}`}>
              {n.icon} {n.label}
            </button>
          ))}
        </div>
      )}
    </nav>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// HOME
// ─────────────────────────────────────────────────────────────────────────────
function Home({ setPage, setSel }) {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const filtered = DRINKS.filter(d =>
    (cat === "All" || d.category === cat) &&
    (!q || d.chineseName.includes(q) || d.englishName.toLowerCase().includes(q.toLowerCase()))
  );
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-stone-800">饮品菜单</h1>
        <p className="text-stone-400 text-sm mt-0.5">Rui Tea · Jersey City, NJ · {DRINKS.length} 款饮品</p>
      </div>
      <div className="relative mb-4">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
        <input value={q} onChange={e => setQ(e.target.value)} placeholder="搜索饮品名..."
          className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 bg-white" />
      </div>
      <div className="flex gap-2 overflow-x-auto pb-2 mb-4">
        {CATEGORIES.map(c => (
          <button key={c} onClick={() => setCat(c)}
            className={`flex-shrink-0 flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium border transition-all
              ${cat === c ? "bg-amber-500 text-white border-amber-500" : "bg-white text-stone-600 border-stone-200 hover:border-amber-300"}`}>
            {c !== "All" && M(c).emoji} {c === "All" ? "全部" : c}
          </button>
        ))}
      </div>
      <p className="text-xs text-stone-400 mb-3">{filtered.length} 款饮品</p>
      <div className="space-y-2.5">
        {filtered.map(d => {
          const meta = M(d.category);
          return (
            <button key={d.id} onClick={() => { setSel(d.id); setPage("drink"); }}
              className={`w-full text-left ${meta.bg} border ${meta.border} rounded-2xl p-4 hover:shadow-md active:scale-[0.99] transition-all`}>
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-1.5">
                    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>{d.category}</span>
                    <span className="text-xs text-stone-400 font-mono">{d.cupSize}</span>
                  </div>
                  <p className="text-xl font-bold text-stone-800">{d.chineseName}</p>
                  <p className="text-stone-500 text-sm mt-0.5">{d.englishName}</p>
                  <p className="text-stone-400 text-xs mt-1 line-clamp-1">{d.description}</p>
                </div>
                <span className="text-4xl flex-shrink-0">{meta.emoji}</span>
              </div>
              <div className="mt-2.5 flex gap-3 text-xs text-stone-400">
                <span>📋 {d.steps.filter(s => !s.isWarning).length} 步</span>
                <span>🍬 {d.sugarOptions[0]}</span>
              </div>
            </button>
          );
        })}
      </div>
      {!filtered.length && (
        <div className="text-center py-16 text-stone-400"><p className="text-4xl mb-3">🔍</p><p>没有找到相关饮品</p></div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// DRINK DETAIL
// ─────────────────────────────────────────────────────────────────────────────
function DrinkDetail({ drink, setPage, setSimDrink }) {
  const [tab, setTab] = useState("recipe");
  const meta = M(drink.category);
  const tabs = [{ k: "recipe", l: "配方步骤" }, { k: "ice", l: "冰量/甜度" }, { k: "toppings", l: "配料" }];
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <button onClick={() => setPage("home")} className="flex items-center gap-1 text-stone-500 hover:text-stone-800 mb-4 text-sm font-medium">← 返回菜单</button>
      <div className={`${meta.bg} border ${meta.border} rounded-2xl p-5 mb-4`}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge}`}>{drink.category}</span>
              <span className="text-xs text-stone-400 font-mono">{drink.cupSize}</span>
            </div>
            <h2 className="text-2xl font-bold text-stone-800">{drink.chineseName}</h2>
            <p className="text-stone-500 mt-0.5 font-medium">{drink.englishName}</p>
            <p className="text-stone-400 text-sm mt-1.5 leading-relaxed">{drink.description}</p>
          </div>
          <span className="text-5xl">{meta.emoji}</span>
        </div>
      </div>
      <button onClick={() => { setSimDrink(drink.id); setPage("simulate"); }}
        className="w-full mb-4 py-2.5 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl text-sm transition-colors flex items-center justify-center gap-2">
        🎮 模拟制作练习
      </button>
      <div className="flex bg-stone-100 rounded-xl p-1 mb-5 gap-1">
        {tabs.map(t => (
          <button key={t.k} onClick={() => setTab(t.k)}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${tab === t.k ? "bg-white shadow-sm text-stone-800" : "text-stone-500"}`}>
            {t.l}
          </button>
        ))}
      </div>
      {tab === "recipe" && (
        <div className="space-y-2">
          {drink.steps.map((step, i) => {
            const vs = VESSEL_STYLE[step.vessel] || VESSEL_STYLE.cup;
            return (
              <div key={i} className={`flex gap-3 border rounded-xl px-4 py-3 ${step.isWarning ? "bg-amber-50 border-amber-300" : vs.bg}`}>
                <div className="flex-shrink-0 flex flex-col items-center gap-1">
                  <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold text-white ${step.isWarning ? "bg-amber-500" : vs.dot}`}>{i + 1}</span>
                  <span className="text-xs">{vs.icon}</span>
                </div>
                <div className="flex-1">
                  <p className={`text-xs font-bold mb-0.5 ${step.isWarning ? "text-amber-600" : "text-stone-400"}`}>{vs.label}</p>
                  <p className={`text-sm leading-relaxed ${step.isWarning ? "text-amber-700 font-medium" : "text-stone-700"}`}>{step.text}</p>
                </div>
              </div>
            );
          })}
          <div className="mt-4 bg-stone-50 border border-stone-100 rounded-xl p-3">
            <p className="text-xs font-bold text-stone-400 mb-2">容器图例</p>
            <div className="flex flex-wrap gap-3">
              {Object.entries(VESSEL_STYLE).map(([k, v]) => (
                <span key={k} className="flex items-center gap-1 text-xs text-stone-500">{v.icon} {v.label}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "ice" && (
        <div className="space-y-5">
          <div>
            <h3 className="font-bold text-stone-700 mb-3">🧊 冰量调整</h3>
            <div className="bg-white border border-stone-100 rounded-xl overflow-hidden">
              {[["full","正常冰"],["less","少冰"],["noIce","去冰"]].map(([k,l],i,a) => (
                <div key={k} className={`px-4 py-3 ${i < a.length-1 ? "border-b border-stone-50" : ""}`}>
                  <p className={`text-xs font-bold uppercase mb-1 ${meta.text}`}>{l}</p>
                  <p className="text-stone-700 text-sm">{drink.lessIce[k]}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-bold text-stone-700 mb-3">🍬 甜度选项</h3>
            <div className="flex flex-wrap gap-2">
              {drink.sugarOptions.map(s => (
                <span key={s} className={`${meta.bg} border ${meta.border} ${meta.text} px-4 py-2 rounded-xl text-sm font-semibold`}>{s}</span>
              ))}
            </div>
          </div>
        </div>
      )}
      {tab === "toppings" && (
        <div>
          <h3 className="font-bold text-stone-700 mb-3">🫧 配料</h3>
          <div className="grid grid-cols-2 gap-2">
            {drink.toppings.map(t => (
              <div key={t} className="bg-white border border-stone-100 rounded-xl px-4 py-3 text-stone-700 text-sm font-medium flex items-center gap-2">
                <span className="text-green-400">✓</span>{t}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SIMULATE PAGE
// ─────────────────────────────────────────────────────────────────────────────
function SimulatePage({ initDrinkId, setPage }) {
  const [drinkId, setDrinkId] = useState(initDrinkId);
  const [phase, setPhase] = useState("select");
  const [pool, setPool]   = useState([]);
  const [order, setOrder] = useState([]);
  const orderRef = useRef([]);  // mirror of order to avoid stale closure in timer
  const [result, setResult] = useState(null);
  const [timeLeft, setTimeLeft] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const timerRef = useRef(null);
  const [search, setSearch] = useState("");

  const drink = DRINKS.find(d => d.id === drinkId);
  const filteredDrinks = DRINKS.filter(d => !search || d.chineseName.includes(search) || d.englishName.toLowerCase().includes(search.toLowerCase()));

  function startGame(d) {
    const realSteps = d.steps.map((s, i) => ({ ...s, id: `real-${i}`, real: true, idx: i }));
    const distractors = shuffle(
      DRINKS.filter(x => x.id !== d.id).flatMap(x => x.steps).filter(s => !s.isWarning)
    ).slice(0, Math.min(4, realSteps.length));
    const fakes = distractors.map((s, i) => ({ ...s, id: `fake-${i}`, real: false }));
    setPool(shuffle([...realSteps, ...fakes]));
    setOrder([]);
    orderRef.current = [];
    setResult(null);
    const stepCount = d.steps.filter(s => !s.isWarning).length;
    setTimeLeft(stepCount * 15);
    setTimerActive(true);
    setPhase("playing");
  }

  useEffect(() => {
    if (!timerActive) return;
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(timerRef.current); setTimerActive(false); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(timerRef.current);
  }, [timerActive]);

  useEffect(() => {
    if (timeLeft === 0 && phase === "playing") checkResult();
  }, [timeLeft]);

  function checkResult() {
    if (!drink) return;
    setTimerActive(false);
    clearInterval(timerRef.current);
    const currentOrder = orderRef.current;  // always fresh, no stale closure
    const correctSteps = drink.steps.filter(s => !s.isWarning);
    // userSteps: only real steps, in the order the user placed them
    const userSteps = currentOrder.filter(s => s.real);
    let correct = 0;
    correctSteps.forEach((step, i) => {
      if (userSteps[i] && userSteps[i].text === step.text) correct++;
    });
    const fakeCount = currentOrder.filter(s => !s.real).length;
    setResult({ correct, total: correctSteps.length, fakeCount, userSteps });
    setPhase("result");
  }

  function addToOrder(step) {
    if (orderRef.current.find(s => s.id === step.id)) return;
    setPool(prev => prev.filter(s => s.id !== step.id));
    setOrder(prev => {
      const next = [...prev, step];
      orderRef.current = next;
      return next;
    });
  }
  function removeFromOrder(step) {
    setOrder(prev => {
      const next = prev.filter(s => s.id !== step.id);
      orderRef.current = next;
      return next;
    });
    setPool(prev => shuffle([...prev, step]));
  }

  const score = result ? Math.round((result.correct / result.total) * 100) : 0;

  if (phase === "select") return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <button onClick={() => setPage("home")} className="flex items-center gap-1 text-stone-500 mb-4 text-sm font-medium">← 返回</button>
      <h2 className="text-2xl font-bold text-stone-800 mb-1">🎮 模拟制作</h2>
      <p className="text-stone-400 text-sm mb-4">选择一款饮品，按正确顺序排列制作步骤</p>
      <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 mb-4 text-sm text-amber-700">
        <p className="font-bold mb-1">📌 游戏说明</p>
        <p>• 从候选步骤中点击，按正确顺序加入「制作顺序」</p>
        <p>• 候选步骤中含有干扰项，注意甄别</p>
        <p>• 每步骤限时 15秒，超时自动提交</p>
      </div>
      <div className="relative mb-3">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400 text-sm">🔍</span>
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="搜索饮品..."
          className="w-full pl-9 pr-4 py-2.5 border border-stone-200 rounded-xl text-sm focus:outline-none focus:border-amber-400 bg-white" />
      </div>
      <div className="space-y-2">
        {filteredDrinks.map(d => {
          const meta = M(d.category);
          return (
            <button key={d.id} onClick={() => { setDrinkId(d.id); startGame(d); }}
              className={`w-full text-left ${meta.bg} border ${meta.border} rounded-xl p-3.5 hover:shadow-md transition-all active:scale-[0.99]`}>
              <div className="flex items-center justify-between">
                <div>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${meta.badge} mr-2`}>{d.category}</span>
                  <span className="text-xs text-stone-400 font-mono">{d.cupSize}</span>
                  <p className="font-bold text-stone-800 mt-1">{d.chineseName}</p>
                  <p className="text-stone-500 text-xs">{d.englishName}</p>
                </div>
                <span className="text-3xl">{meta.emoji}</span>
              </div>
              <p className="text-xs text-stone-400 mt-1.5">📋 {d.steps.filter(s => !s.isWarning).length} 个操作步骤</p>
            </button>
          );
        })}
      </div>
    </div>
  );

  if (phase === "playing" && drink) {
    const realCount = drink.steps.filter(s => !s.isWarning).length;
    const progress = order.filter(s => s.real).length / realCount;
    const timerPct = timeLeft / (realCount * 15);
    return (
      <div className="max-w-2xl mx-auto px-4 py-5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-stone-400">正在制作</p>
            <h3 className="font-bold text-stone-800 text-lg">{drink.chineseName}</h3>
          </div>
          <div className={`flex flex-col items-center justify-center w-14 h-14 rounded-full border-4 font-bold text-lg
            ${timerPct > 0.4 ? "border-green-400 text-green-600" : timerPct > 0.15 ? "border-amber-400 text-amber-600" : "border-red-400 text-red-600"}`}>
            {timeLeft}
          </div>
        </div>
        <div className="w-full bg-stone-100 rounded-full h-2 mb-4">
          <div className="bg-amber-400 h-2 rounded-full transition-all" style={{ width: `${progress * 100}%` }} />
        </div>
        <div className="mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase mb-2">📋 已排步骤（{order.length}/{realCount}）</p>
          <div className="min-h-16 bg-stone-50 border-2 border-dashed border-stone-200 rounded-xl p-2 space-y-1.5">
            {!order.length && <p className="text-center text-stone-300 text-sm py-4">点击下方步骤加入这里 ↓</p>}
            {order.map((step, i) => {
              const vs = VESSEL_STYLE[step.vessel] || VESSEL_STYLE.cup;
              return (
                <div key={step.id} className={`flex items-center gap-2 border rounded-lg px-3 py-2 ${vs.bg}`}>
                  <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 ${vs.dot}`}>{i + 1}</span>
                  <span className="text-xs">{vs.icon}</span>
                  <span className="text-sm text-stone-700 flex-1">{step.text}</span>
                  <button onClick={() => removeFromOrder(step)} className="text-stone-300 hover:text-red-400 text-lg leading-none">×</button>
                </div>
              );
            })}
          </div>
        </div>
        <div className="mb-4">
          <p className="text-xs font-bold text-stone-500 uppercase mb-2">🎯 候选步骤（含干扰项，请仔细判断）</p>
          <div className="space-y-1.5">
            {pool.map(step => {
              const vs = VESSEL_STYLE[step.vessel] || VESSEL_STYLE.cup;
              return (
                <button key={step.id} onClick={() => addToOrder(step)}
                  className={`w-full text-left flex items-center gap-2 border rounded-xl px-3 py-2.5 ${vs.bg} hover:shadow-sm active:scale-[0.99] transition-all`}>
                  <span className="text-sm">{vs.icon}</span>
                  <span className="text-xs text-stone-400 w-16 flex-shrink-0">{vs.label}</span>
                  <span className="text-sm text-stone-700 flex-1">{step.text}</span>
                  <span className="text-stone-300 text-lg">+</span>
                </button>
              );
            })}
            {!pool.length && <p className="text-center text-stone-300 text-sm py-3">所有步骤已排列完毕</p>}
          </div>
        </div>
        <button onClick={checkResult} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">
          ✅ 提交答案
        </button>
      </div>
    );
  }

  if (phase === "result" && drink && result) {
    const meta = M(drink.category);
    const pass = score >= 80;
    return (
      <div className="max-w-2xl mx-auto px-4 py-5">
        <div className={`rounded-2xl p-5 mb-5 border ${pass ? "bg-green-50 border-green-300" : "bg-red-50 border-red-200"}`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-bold uppercase mb-1 text-stone-400">制作结果</p>
              <h3 className="text-xl font-bold text-stone-800">{drink.chineseName}</h3>
            </div>
            <span className="text-5xl">{score === 100 ? "🏆" : pass ? "👍" : "💪"}</span>
          </div>
          <div className="mt-4 flex items-end gap-4">
            <div>
              <p className={`text-5xl font-black ${pass ? "text-green-600" : "text-red-500"}`}>{score}<span className="text-2xl">%</span></p>
              <p className="text-stone-500 text-sm">{result.correct}/{result.total} 步骤正确</p>
            </div>
            {result.fakeCount > 0 && (
              <div className="bg-red-100 text-red-600 px-3 py-1.5 rounded-xl text-sm font-medium">
                ⚠️ 加入了 {result.fakeCount} 个干扰步骤
              </div>
            )}
          </div>
        </div>
        <div className="mb-5">
          <h4 className="font-bold text-stone-700 mb-3">✅ 标准制作步骤</h4>
          <div className="space-y-1.5">
            {(() => {
              // Build a parallel list: for each correctStep[j], what did user place at position j?
              const correctSteps = drink.steps.filter(s => !s.isWarning);
              const userSteps = result.userSteps || [];
              // We render ALL drink.steps (including warnings), but for scoring we only
              // track position within correctSteps
              let correctIdx = 0;
              return drink.steps.map((step, i) => {
                const vs = VESSEL_STYLE[step.vessel] || VESSEL_STYLE.cup;
                if (step.isWarning) {
                  return (
                    <div key={i} className="flex items-center gap-2 border rounded-xl px-3 py-2.5 bg-amber-50 border-amber-200">
                      <span className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0 bg-amber-400">{i + 1}</span>
                      <span className="text-sm">{vs.icon}</span>
                      <p className="text-sm text-amber-700 font-medium flex-1">{step.text}</p>
                    </div>
                  );
                }
                const j = correctIdx++;
                const userPlaced = userSteps[j];
                const isRight = userPlaced && userPlaced.text === step.text;
                return (
                  <div key={i} className={`flex items-center gap-2 border rounded-xl px-3 py-2.5
                    ${isRight ? "bg-green-50 border-green-300" : "bg-white border-stone-200"}`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white flex-shrink-0
                      ${isRight ? "bg-green-500" : "bg-red-400"}`}>{i + 1}</span>
                    <span className="text-sm">{vs.icon}</span>
                    <div className="flex-1">
                      <p className="text-sm text-stone-700">{step.text}</p>
                      {!isRight && userPlaced && (
                        <p className="text-xs text-red-500 mt-0.5">你填写了：{userPlaced.text}</p>
                      )}
                      {!isRight && !userPlaced && (
                        <p className="text-xs text-red-500 mt-0.5">未填写</p>
                      )}
                    </div>
                    <span>{isRight ? "✅" : "❌"}</span>
                  </div>
                );
              });
            })()}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={() => startGame(drink)} className="flex-1 py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">
            🔄 重新练习
          </button>
          <button onClick={() => { setPhase("select"); setSearch(""); }} className="flex-1 py-3 bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold rounded-xl transition-colors">
            换一款
          </button>
        </div>
      </div>
    );
  }
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// QUIZ
// ─────────────────────────────────────────────────────────────────────────────
function Quiz() {
  const [type, setType] = useState(null);
  const [q, setQ] = useState(null);
  const [sel, setSel] = useState(null);
  const [score, setScore] = useState({ c: 0, t: 0 });
  const [shown, setShown] = useState(false);

  function genG() { const d=DRINKS[Math.floor(Math.random()*DRINKS.length)]; const o=shuffle(DRINKS.filter(x=>x.id!==d.id)).slice(0,3); const choices=shuffle([d,...o]); const prev=shuffle(d.steps.filter(s=>!s.isWarning)).slice(0,2).map(s=>s.text); setQ({type:"guess",d,choices,prev});setSel(null);setShown(false); }
  function genS() { const d=DRINKS[Math.floor(Math.random()*DRINKS.length)]; const rs=d.steps.filter(s=>!s.isWarning); if(!rs.length){genS();return;} const s=rs[Math.floor(Math.random()*rs.length)]; const w=shuffle(DRINKS.filter(x=>x.id!==d.id).flatMap(x=>x.steps).filter(x=>!x.isWarning&&x.text!==s.text)).slice(0,3); const choices=shuffle([s,...w]); const idx=d.steps.indexOf(s)+1; setQ({type:"steps",d,s,choices,idx});setSel(null);setShown(false); }
  function genI() { const d=DRINKS[Math.floor(Math.random()*DRINKS.length)]; const k=["full","less","noIce"][Math.floor(Math.random()*3)]; const c=d.lessIce[k]; const w=shuffle(DRINKS.filter(x=>x.id!==d.id).map(x=>x.lessIce[k]).filter(Boolean)).slice(0,3); const choices=shuffle([c,...w]); const label={full:"正常冰",less:"少冰",noIce:"去冰"}[k]; setQ({type:"ice",d,k,c,choices,label});setSel(null);setShown(false); }
  function genV() { const d=DRINKS[Math.floor(Math.random()*DRINKS.length)]; const rs=d.steps.filter(s=>!s.isWarning); if(!rs.length){genV();return;} const s=rs[Math.floor(Math.random()*rs.length)]; const vessels=["cup","shaker","blender"]; const correct=s.vessel; const wrongs=shuffle(vessels.filter(v=>v!==correct)); const choices=shuffle([correct,...wrongs.slice(0,2)]); setQ({type:"vessel",d,s,correct,choices});setSel(null);setShown(false); }

  function answer(choice) { if(shown)return; setSel(choice);setShown(true); const ok=q.type==="guess"?choice.id===q.d.id:q.type==="steps"?choice.text===q.s.text:q.type==="ice"?choice===q.c:choice===q.correct; setScore(s=>({c:s.c+(ok?1:0),t:s.t+1})); }
  function isOk(choice) { if(q.type==="guess")return choice.id===q.d.id; if(q.type==="steps")return choice.text===q.s.text; if(q.type==="ice")return choice===q.c; return choice===q.correct; }
  function next() { if(type==="guess")genG();else if(type==="steps")genS();else if(type==="ice")genI();else genV(); }
  const VL={cup:"🥤 出品杯",shaker:"🧉 Shaker杯",blender:"⚡ Blender"};

  if (!type) return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold text-stone-800 mb-1">🎯 知识测验</h2>
      <p className="text-stone-500 mb-5 text-sm">测试你对 Rui Tea 真实配方的掌握程度！</p>
      {score.t > 0 && (
        <div className="mb-5 bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-center justify-between">
          <div><p className="text-sm text-amber-700 font-medium">本次得分</p><p className="text-2xl font-bold text-amber-800">{score.c}/{score.t} <span className="text-base font-normal text-amber-600">({Math.round(score.c/score.t*100)}%)</span></p></div>
          <span className="text-4xl">{score.c/score.t>=0.8?"🏆":score.c/score.t>=0.5?"👍":"💪"}</span>
        </div>
      )}
      <div className="grid grid-cols-2 gap-3">
        {[{k:"guess",e:"🔍",t:"猜饮品",s:"根据制作步骤猜饮品名称"},{k:"steps",e:"📋",t:"辨别真假步骤",s:"找出该饮品的正确步骤"},{k:"ice",e:"🧊",t:"冰量测验",s:"匹配正确的少冰/去冰说明"},{k:"vessel",e:"🥤",t:"容器测验",s:"判断步骤应用哪个容器操作"}].map(item=>(
          <button key={item.k} onClick={()=>{setType(item.k);if(item.k==="guess")genG();else if(item.k==="steps")genS();else if(item.k==="ice")genI();else genV();}}
            className="text-left bg-white border border-stone-200 rounded-2xl p-4 hover:border-amber-400 hover:shadow-md transition-all">
            <span className="text-3xl block mb-2">{item.e}</span>
            <p className="font-bold text-stone-800 text-sm">{item.t}</p>
            <p className="text-stone-400 text-xs mt-0.5">{item.s}</p>
          </button>
        ))}
      </div>
      {score.t>0&&<button onClick={()=>setScore({c:0,t:0})} className="mt-4 w-full py-2 border border-stone-200 rounded-xl text-stone-400 text-sm">重置得分</button>}
    </div>
  );

  if (!q) return null;
  const meta = M(q.d.category);
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <div className="flex items-center justify-between mb-5">
        <button onClick={()=>setType(null)} className="text-stone-500 text-sm font-medium">← 测验菜单</button>
        <span className="text-sm text-stone-500 font-medium">✅ {score.c} / {score.t}</span>
      </div>
      <div className={`${meta.bg} border ${meta.border} rounded-2xl p-5 mb-5`}>
        {q.type==="guess"&&<><p className="text-xs font-bold text-stone-400 uppercase mb-3">以下步骤属于哪款饮品？</p>{q.prev.map((x,i)=><p key={i} className="text-stone-700 font-medium text-sm">• {x}</p>)}</>}
        {q.type==="steps"&&<><p className="text-xs font-bold text-stone-400 uppercase mb-2">以下哪项是 <span className={meta.text}>{q.d.chineseName}</span> 的第 {q.idx} 步操作？</p><p className="text-stone-500 text-sm">{q.d.englishName}</p></>}
        {q.type==="ice"&&<><p className="text-xs font-bold text-stone-400 uppercase mb-2">以下哪项是 <span className={meta.text}>{q.label}</span> 的正确说明？</p><p className="text-xl font-bold text-stone-800">{q.d.chineseName}</p><p className="text-stone-400 text-sm">{q.d.cupSize}</p></>}
        {q.type==="vessel"&&<><p className="text-xs font-bold text-stone-400 uppercase mb-2">制作 <span className={meta.text}>{q.d.chineseName}</span> 时，以下步骤应在哪个容器中操作？</p><p className="text-stone-700 font-medium text-sm bg-white/70 rounded-lg px-3 py-2 mt-2">「{q.s.text}」</p></>}
      </div>
      <div className="space-y-2 mb-4">
        {q.choices.map((choice,i)=>{
          const label=q.type==="guess"?`${choice.chineseName} (${choice.englishName})`:q.type==="steps"?choice.text:q.type==="vessel"?VL[choice]:choice;
          const ok=isOk(choice); const isSel=q.type==="guess"?sel?.id===choice.id:q.type==="steps"?sel?.text===choice.text:sel===choice;
          let cls="w-full text-left px-4 py-3 rounded-xl border text-sm font-medium transition-all ";
          if(!shown)cls+="bg-white border-stone-200 hover:border-amber-400 text-stone-700";
          else if(ok)cls+="bg-green-50 border-green-400 text-green-700";
          else if(isSel)cls+="bg-red-50 border-red-400 text-red-700";
          else cls+="bg-white border-stone-100 text-stone-400";
          return <button key={i} onClick={()=>answer(choice)} className={cls}><span className="mr-2">{shown?(ok?"✓":isSel?"✗":"·"):"○"}</span>{label}</button>;
        })}
      </div>
      {shown&&<div className={`rounded-xl p-4 mb-4 ${isOk(sel)?"bg-green-50 border border-green-200":"bg-red-50 border border-red-200"}`}>
        <p className={`font-bold ${isOk(sel)?"text-green-700":"text-red-700"}`}>{isOk(sel)?"🎉 回答正确！":"❌ 回答错误"}</p>
        {!isOk(sel)&&<p className="text-sm text-stone-500 mt-1">正确答案已用绿色标出。</p>}
      </div>}
      {shown&&<button onClick={next} className="w-full py-3 bg-amber-500 hover:bg-amber-600 text-white font-bold rounded-xl transition-colors">下一题 →</button>}
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CHECKLIST PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ChecklistPage() {
  const [checked, setChecked] = useState({});
  const toggle = id => setChecked(p => ({ ...p, [id]: !p[id] }));
  const doneCount = CHECKLIST_ITEMS.filter(i => checked[i.id]).length;
  const allDone = doneCount === CHECKLIST_ITEMS.length;

  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <div className="mb-4 flex items-start justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-800">✅ 开班备货清单</h2>
          <p className="text-stone-400 text-sm mt-0.5">每日开班前逐项检查</p>
        </div>
        <button onClick={() => setChecked({})} className="text-xs text-stone-400 border border-stone-200 px-3 py-1.5 rounded-lg hover:border-stone-300 mt-1">重置</button>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-1.5">
          <span className="font-medium text-stone-600">{doneCount} / {CHECKLIST_ITEMS.length} 已完成</span>
          {allDone && <span className="text-green-600 font-bold">🎉 全部完成！</span>}
        </div>
        <div className="w-full bg-stone-100 rounded-full h-2.5">
          <div className="bg-green-500 h-2.5 rounded-full transition-all duration-300" style={{ width: `${(doneCount/CHECKLIST_ITEMS.length)*100}%` }} />
        </div>
      </div>

      {/* Checklist */}
      <div className="space-y-2 mb-6">
        {CHECKLIST_ITEMS.map(item => (
          <button key={item.id} onClick={() => toggle(item.id)}
            className={`w-full text-left flex items-start gap-3 px-4 py-3 rounded-xl border transition-all
              ${checked[item.id] ? "bg-green-50 border-green-300" : item.isWarning ? "bg-amber-50 border-amber-200" : "bg-white border-stone-200 hover:border-stone-300"}`}>
            <span className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5 transition-all
              ${checked[item.id] ? "bg-green-500 border-green-500" : "border-stone-300"}`}>
              {checked[item.id] && <span className="text-white text-xs font-bold">✓</span>}
            </span>
            <span className={`text-sm leading-relaxed ${checked[item.id] ? "line-through text-stone-400" : item.isWarning ? "text-amber-700 font-medium" : "text-stone-700"}`}>
              {item.text}
            </span>
          </button>
        ))}
      </div>

      {/* Fruit Weights */}
      <div className="bg-white border border-stone-200 rounded-2xl p-4 mb-4">
        <h3 className="font-bold text-stone-700 mb-3">🍓 水果杯标准重量（不含杯重）</h3>
        <div className="space-y-1.5">
          {FRUIT_WEIGHTS.map(f => (
            <div key={f.item} className="flex items-center justify-between py-1.5 border-b border-stone-50 last:border-0">
              <span className="text-stone-700 font-medium text-sm">{f.item}</span>
              <span className="text-stone-500 text-sm font-mono bg-stone-50 px-2 py-0.5 rounded">{f.weight}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Coffee reminder */}
      <div className="bg-stone-800 text-white rounded-2xl p-4">
        <p className="font-bold mb-2">☕ 咖啡制作标准</p>
        <p className="text-stone-300 text-sm">咖啡豆 <span className="text-amber-400 font-bold">18.7g</span>（每次必须称量）</p>
        <p className="text-stone-300 text-sm">萃取出 <span className="text-amber-400 font-bold">36g</span> 咖啡，约 <span className="text-amber-400 font-bold">36秒</span></p>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// CONTACTS PAGE
// ─────────────────────────────────────────────────────────────────────────────
function ContactsPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-5">
      <h2 className="text-2xl font-bold text-stone-800 mb-1">📞 紧急联系</h2>
      <p className="text-stone-400 text-sm mb-5">遇到问题时的联系方式</p>
      <div className="space-y-3">
        {CONTACTS.map(c => (
          <div key={c.name} className="bg-white border border-stone-200 rounded-2xl p-4 flex items-center gap-4">
            <span className="text-4xl flex-shrink-0">{c.emoji}</span>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-stone-800">{c.name}</p>
              <p className="text-stone-400 text-xs">{c.role}</p>
              <a href={`tel:${c.phone.replace(/\D/g,'')}`}
                className="text-amber-600 font-bold text-lg hover:text-amber-700 mt-0.5 block">
                {c.phone}
              </a>
            </div>
            <a href={`tel:${c.phone.replace(/\D/g,'')}`}
              className="flex-shrink-0 bg-amber-500 hover:bg-amber-600 text-white w-10 h-10 rounded-full flex items-center justify-center text-lg transition-colors">
              📲
            </a>
          </div>
        ))}
      </div>
      <div className="mt-6 bg-stone-50 border border-stone-200 rounded-2xl p-4">
        <p className="font-bold text-stone-700 mb-2 text-sm">📍 店铺地址</p>
        <p className="text-stone-600 text-sm">10 Provost Street, Jersey City, NJ 07302</p>
        <a href="https://maps.google.com/?q=10+Provost+Street+Jersey+City+NJ+07302" target="_blank" rel="noopener noreferrer"
          className="inline-block mt-2 text-amber-600 text-sm font-medium hover:underline">
          在地图中查看 →
        </a>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// APP
// ─────────────────────────────────────────────────────────────────────────────
export default function App() {
  const [page, setPage] = useState("home");
  const [selId, setSelId] = useState(null);
  const [simDrinkId, setSimDrinkId] = useState(null);
  const drink = DRINKS.find(d => d.id === selId);

  return (
    <div className="min-h-screen bg-stone-50">
      <Nav page={page} setPage={setPage} />
      <main className="pb-12">
        {page === "home"      && <Home setPage={setPage} setSel={setSelId} />}
        {page === "drink"     && drink && <DrinkDetail drink={drink} setPage={setPage} setSimDrink={setSimDrinkId} />}
        {page === "simulate"  && <SimulatePage initDrinkId={simDrinkId} setPage={setPage} />}
        {page === "quiz"      && <Quiz />}
        {page === "checklist" && <ChecklistPage />}
        {page === "contacts"  && <ContactsPage />}
      </main>
    </div>
  );
}
