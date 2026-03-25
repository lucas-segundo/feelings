// Loaded by statusbar_command (see .vscode/settings.json).
module.exports = function runPrSizeStatusbar(vscode, statusBarItem) {
  try {
    const cp = require('child_process')

    const MAX_GREEN = 20
    const MAX_YELLOW = 30

    const wsPath = vscode.workspace.workspaceFolders[0].uri.fsPath
    const cmd = 'git diff --name-only main...HEAD 2>/dev/null | wc -l'
    const res = cp.execSync(cmd, { cwd: wsPath, encoding: 'utf8' }).trim()
    const count = parseInt(res, 10) || 0

    let icon
    if (count <= MAX_GREEN) icon = '🟢'
    else if (count <= MAX_YELLOW) icon = '🟡'
    else icon = '🔴'

    statusBarItem.text = `${icon} PR: ${count} arquivos`
  } catch (e) {
    statusBarItem.text = '⚪ PR: main ñ enc.'
  }
}
