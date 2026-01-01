/**

Staqlt VEU Master Register - Core Logic */

function onOpen() { SpreadsheetApp.getUi() .createMenu('⚡ VEU Tools') .addItem('Unit Selection Sidebar', 'showSidebar') .addItem('Sync with CRM', 'syncGHLData') .addToUi(); }

function showSidebar() { var html = HtmlService.createHtmlOutputFromFile('Sidebar') .setTitle('Technical Unit Selection') .setWidth(300); SpreadsheetApp.getUi().showSidebar(html); }

/**

Automatically locks rows and turns them gray when status is "Paid" */ function onEdit(e) { const sheet = e.source.getActiveSheet(); const range = e.range; const statusColumn = 10; // Column J

if (sheet.getName() === "Master_Register" && range.getColumn() === statusColumn) { const status = range.getValue(); if (status === "Paid") { const row = range.getRow(); const numCols = sheet.getLastColumn();

  // 1. Change Background Color to Gray
  sheet.getRange(row, 1, 1, numCols).setBackground('#eeeeee');
  
  // 2. Lock the Row
  const protection = sheet.getRange(row, 1, 1, numCols).protect();
  protection.setDescription('Locked - Paid Status achieved on ' + new Date());
  
  // Remove all users except owner
  const me = Session.getEffectiveUser();
  protection.addEditor(me);
  protection.removeEditors(protection.getEditors());
  if (protection.canDomainEdit()) {
    protection.setDomainEdit(false);
  }
}


} }

/**

Calculates VEECs based on head count */ function calculateVEECs(headCount) { const logicMap = { 1: 25, 2: 52, 3: 76, 4: 87, 5: 110 }; return logicMap[headCount] || 0; }