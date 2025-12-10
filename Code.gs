function doGet(e) {
  const action = e.parameter.action;
  
  if (action === 'getQuestions') {
    return getQuestions(e.parameter.count);
  }
  
  return ContentService.createTextOutput("Invalid Action");
}

function doPost(e) {
  // GAS Web App often receives POST data as string in e.postData.contents
  let data;
  try {
    data = JSON.parse(e.postData.contents);
  } catch (err) {
    return ContentService.createTextOutput("Invalid JSON");
  }

  if (data.action === 'submitScore') {
    return submitScore(data);
  }
  
  return ContentService.createTextOutput("Invalid Action");
}

function getQuestions(count) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('題目');
  const rows = sheet.getDataRange().getValues();
  // Header is row 0: ID, Question, A, B, C, D, Answer
  // Data starts at row 1
  const allQuestions = rows.slice(1).map((row, index) => ({
    id: row[0],
    question: row[1],
    A: row[2],
    B: row[3],
    C: row[4],
    D: row[5],
    answer: row[6]
  }));
  
  // Random shuffle
  const shuffled = allQuestions.sort(() => 0.5 - Math.random());
  const selected = shuffled.slice(0, count || 5);
  
  // Return JSON
  return ContentService.createTextOutput(JSON.stringify(selected))
    .setMimeType(ContentService.MimeType.JSON);
}

function submitScore(data) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('回答');
  // Columns: 'ID', '闖關次數', '總分', '最高分', '第一次通關分數', '花了幾次通關', '最近遊玩時間'
  
  const userId = data.userId;
  const score = data.score; // Raw score count
  
  const dataRange = sheet.getDataRange();
  const values = dataRange.getValues();
  
  let rowIndex = -1;
  for (let i = 1; i < values.length; i++) {
    if (values[i][0] == userId) {
      rowIndex = i + 1; // 1-based index
      break;
    }
  }
  
  const now = new Date();
  
  if (rowIndex > 0) {
    // Update existing user
    // Get current values
    const currentAttempts = values[rowIndex - 1][1] || 0;
    const currentTotalScore = values[rowIndex - 1][2] || 0;
    const currentHighScore = values[rowIndex - 1][3] || 0;
    // index 4 is first_pass_score
    const passAttempts = values[rowIndex - 1][5] || '';
    
    // Update logic
    const newAttempts = currentAttempts + 1;
    const newTotalScore = currentTotalScore + score;
    const newHighScore = Math.max(currentHighScore, score);
    
    // If passed? (We need logic for "Pass", assumes client sends 'passed' boolean or we check threshold)
    // Let's assume data.passed is passed from client
    let firstPassScore = values[rowIndex - 1][4];
    let attemptsToPass = values[rowIndex - 1][5];
    
    // Fix: Check for empty/null/undefined explicitly to avoid false negatives when score is 0
    if (data.passed && (firstPassScore === '' || firstPassScore === null || firstPassScore === undefined)) {
        firstPassScore = score;
        attemptsToPass = newAttempts;
    }
    
    // Update row
    sheet.getRange(rowIndex, 2).setValue(newAttempts);
    sheet.getRange(rowIndex, 3).setValue(newTotalScore);
    sheet.getRange(rowIndex, 4).setValue(newHighScore);
    if (firstPassScore !== values[rowIndex - 1][4]) sheet.getRange(rowIndex, 5).setValue(firstPassScore);
    if (attemptsToPass !== values[rowIndex - 1][5]) sheet.getRange(rowIndex, 6).setValue(attemptsToPass);
    sheet.getRange(rowIndex, 7).setValue(now);
    
  } else {
    // New User
    const firstPassScore = data.passed ? score : '';
    const attemptsToPass = data.passed ? 1 : '';
    
    sheet.appendRow([
      userId,
      1, // attempts
      score, // total score (first time)
      score, // high score
      firstPassScore,
      attemptsToPass,
      now
    ]);
  }
  
  return ContentService.createTextOutput(JSON.stringify({ status: "success" }))
    .setMimeType(ContentService.MimeType.JSON);
}
