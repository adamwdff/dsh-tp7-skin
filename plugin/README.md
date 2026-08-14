# 动态插件版使用说明

`dynamic.js` 是**单文件动态插件**，无需修改 DeepSeek Harness 仓库即可使用，适合快速体验与分享演示。

## 操作步骤（在 DSH 会话中）

1. **定义插件**：让 Agent 执行 `cordis_define`，填写：
   - `plugin.kind` → `"new"`
   - `plugin.idPrefix` → `tpsk`
   - `name` → `Turbo Pascal 7.0 蓝屏皮肤`
   - `purpose` → 简要描述
   - `code.client` → **本文件的完整内容**
   - `code.host` → 留空

2. **运行插件**：让 Agent 执行 `cordis_run`（mode `run`），在界面中批准运行。

3. **刷新页面**，蓝屏皮肤即生效。

## 卸载

- 临时停用：`cordis_stop`
- 永久删除：`cordis_undefine`（会删除插件及其所有版本）

## 注意事项

- 动态插件是**会话级、进程内**的，重启 DSH 后需要重新加载；
- 若希望皮肤随应用常驻，请使用仓库内 `src/` 的固定插件版（见根 README「方式二」）。
