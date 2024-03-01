import csv
file = open('Players_IE1.csv')
csvreader = csv.reader(file)
header = []
header = next(csvreader)
rows = []
for row in csvreader:
        rows.append(row)

tab = []

i=999
while i != len(rows):
    fullname = rows[i][0]
    nickname = rows[i][1]
    position = rows[i][2]
    gender = rows[i][3]
    size = rows[i][4]
    element = rows[i][5]
    fp = rows[i][15]
    tp = rows[i][17]
    kick = rows[i][19]
    body = rows[i][21]
    control = rows[i][23]
    guard = rows[i][25]
    speed = rows[i][27]
    stamina = rows[i][29]
    guts = rows[i][31]
    freedom = rows[i][33]

    move1 = rows[i][45]
    lvlmove1 = rows[i][46]

    move2 = rows[i][47]
    lvlmove2 = rows[i][48]

    move3 = rows[i][49]
    lvlmove3 = rows[i][50]

    move4 = rows[i][51]
    lvlmove4 = rows[i][52]

    player = (
    '("'+ fullname + '"' + ", " 
    + '"' + nickname + '"' + ", " 
    + "'" + position + "'" + ", " 
    + "'" + gender + "'" + ", " 
    + "'" + size + "'" + ", " 
    + "'" + element + "'" + ", " 
    + fp + ", " 
    + tp + ", "
    + kick + ", "
    + body + ", "
    + control + ", "
    + guard + ", "
    + speed + ", "
    + stamina + ", "
    + guts + ", "
    + freedom + ", "
    + "'" + move1 + "'" + ", "
    + "'" + lvlmove1 + "'" + ", "
    + "'" + move2 + "'" + ", "
    + "'" + lvlmove2 + "'" + ", "
    + "'" + move3 + "'" + ", "
    + "'" + lvlmove3 + "'" + ", "
    + "'" + move4 + "'" + ", "
    + "'" + lvlmove4 + "'"
    + ")" + ",")

    print(player)
    
    i += 1