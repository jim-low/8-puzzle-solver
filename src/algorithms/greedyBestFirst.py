import random
#8-Puzzle problem

"""
positions in this problem
_____________
| 1 | 2 | 3 |
|___|___|___|
| 4 | 5 | 6 |
|___|___|___|
| 7 | 8 | 9 |
|___|___|___|
"""

class Queue:
    def __init__(self, lst):
        self.lst = lst
        self.visited = None
        self.heuristic = None

class Game:
    def __init__(self):
        self.main = []
        self.goal = [' ', 1, 2, 3, 4, 5, 6, 7, 8, 0]
    
    def display(self,lst):
        print('_____________')
        print('| '+str(lst[1])+' | '+str(lst[2])+' | '+str(lst[3])+' |')
        print('|___|___|___|')
        print('| '+str(lst[4])+' | '+str(lst[5])+' | '+str(lst[6])+' |')
        print('|___|___|___|')
        print('| '+str(lst[7])+' | '+str(lst[8])+' | '+str(lst[9])+' |')
        print('|___|___|___|')
   

    def moveUp(self, lst):
        dup = self.createDuplicate(lst)
        ind = dup.index(0)
        if ind > 3:
            dup[ind - 3], dup[ind] = dup[ind], dup[ind - 3]
            return dup
        return 'cannot move upward'

    def moveDown(self, lst):
        dup  = self.createDuplicate(lst)
        ind = dup.index(0)
        if ind < 7:
            dup[ind + 3], dup[ind] = dup[ind], dup[ind + 3]
            return dup
        return 'cannot move downward'

    def moveLeft(self, lst):
        dup = self.createDuplicate(lst)
        ind = lst.index(0)
        if ind != 1 and ind != 4 and ind != 7:
            dup[ind - 1], dup[ind] = dup[ind], dup[ind - 1]
            return dup
        return 'cannot move upward'
    
    def moveRight(self, lst):
        dup = self.createDuplicate(lst)
        ind = lst.index(0)
        if ind != 3 and ind != 6 and ind != 9:
            dup[ind + 1], dup[ind] = dup[ind], dup[ind + 1]
            return dup
        return 'cannot move upward'

    
    def createDuplicate(self, lst):
        dup = []
        for i in lst:
            dup.append(i)
        return dup


    def calculateHeuristic(self, lst):
        """How far each tile have to move to get to goal state"""
        h = 0
        for i in lst:
            ind = lst.index(i)
            goalind = self.goal.index(i)
            if goalind == 1:
                if (ind == 2 or ind == 4):
                    h += 1
                elif (ind == 3 or ind == 5 or ind == 7):
                    h += 2
                elif (ind == 6 or ind == 8):
                    h += 3
                elif ind == 9:
                    h += 4
            if goalind == 2:
                if (ind == 1 or ind == 3 or ind == 5):
                    h += 1
                elif (ind == 4 or ind == 6 or ind == 8):
                    h += 2
                elif (ind == 7 or ind == 9):
                    h += 3  
            if goalind == 3:
                if (ind == 2 or ind == 6):
                    h += 1
                elif (ind == 1 or ind == 5 or ind == 9):
                    h += 2
                elif (ind == 4 or ind == 8):
                    h += 3
                elif ind == 7:
                    h += 4
            if goalind == 4:
                if (ind == 1 or ind == 7 or ind == 5):
                    h += 1
                elif (ind == 2 or ind == 8 or ind == 6):
                    h += 2
                elif (ind == 3 or ind == 9):
                    h += 3
            if goalind == 5:
                if (ind == 2 or ind == 8 or ind == 4 or ind == 6):
                    h += 1
                elif (ind == 1 or ind == 3 or ind == 7 or ind == 9):
                    h += 2
            if goalind == 6:
                if (ind == 3 or ind == 9 or ind == 5):
                    h += 1
                elif (ind == 2 or ind == 4 or ind == 8):
                    h += 2
                elif (ind == 1 or ind == 7):
                    h += 3
            if goalind == 7:
                if (ind == 4 or ind == 8):
                    h += 1
                elif (ind == 1 or ind == 5 or ind == 9):
                    h += 2
                elif (ind == 6 or ind == 2):
                    h += 3
                elif ind == 3:
                    h += 4
            if goalind == 8:
                if (ind == 7 or ind == 9 or ind == 5):
                    h += 1
                elif (ind == 2 or ind == 4 or ind == 6):
                    h += 2
                elif (ind == 1 or ind == 3):
                    h += 3
            if goalind == 9:
                if (ind == 8 or ind == 6):
                    h += 1
                elif (ind == 7 or ind == 5 or ind == 3):
                    h += 2
                elif (ind == 4 or ind == 2):
                    h += 3
                elif ind == 1:
                    h += 4
        return h
    
    def check_repeating_lst(self, lst):
        for j in self.main:
            if j.lst == lst:
                return -1
        return lst

    def moveElement(self, lst):
        empty = lst.index(0)
        mainLst = []
        if empty == 1:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)

        if empty == 2:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)

        if empty == 3:
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)

        if empty == 4:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)
            lst3 = self.check_repeating_lst(self.moveUp(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)
            
        if empty == 5:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)
            lst4 = self.check_repeating_lst(self.moveUp(lst))
            if lst4 != -1:
                lst4 = Queue(lst4)
                lst4.heuristic = self.calculateHeuristic(lst4.lst)
                mainLst.append(lst4)
            
        if empty == 6:
            lst2 = self.check_repeating_lst(self.moveDown(lst))
            if lst2 != -1:
                lst2 = Queue(lst2)
                lst2.heuristic = self.calculateHeuristic(lst2.lst)
                mainLst.append(lst2)
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)
            lst4 = self.check_repeating_lst(self.moveUp(lst))
            if lst4 != -1:
                lst4 = Queue(lst4)
                lst4.heuristic = self.calculateHeuristic(lst4.lst)
                mainLst.append(lst4)

        if empty == 7:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst4 = self.check_repeating_lst(self.moveUp(lst))
            if lst4 != -1:
                lst4 = Queue(lst4)
                lst4.heuristic = self.calculateHeuristic(lst4.lst)
                mainLst.append(lst4)

        if empty == 8:
            lst1 = self.check_repeating_lst(self.moveRight(lst))
            if lst1 != -1:
                lst1 = Queue(lst1)
                lst1.heuristic = self.calculateHeuristic(lst1.lst)
                mainLst.append(lst1)
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)
            lst4 = self.check_repeating_lst(self.moveUp(lst))
            if lst4 != -1:
                lst4 = Queue(lst4)
                lst4.heuristic = self.calculateHeuristic(lst4.lst)
                mainLst.append(lst4)

        if empty == 9:
            lst3 = self.check_repeating_lst(self.moveLeft(lst))
            if lst3 != -1:
                lst3 = Queue(lst3)
                lst3.heuristic = self.calculateHeuristic(lst3.lst)
                mainLst.append(lst3)
            lst4 = self.check_repeating_lst(self.moveUp(lst))
            if lst4 != -1:
                lst4 = Queue(lst4)
                lst4.heuristic = self.calculateHeuristic(lst4.lst)
                mainLst.append(lst4)

        return mainLst

    def get_random_puzzle(self):
        lst = [8, 7, 0, 5, 1, 6, 2, 3, 4]
        #random.shuffle(lst)
        lst.insert(0, ' ')
        return lst
    
    def getLowestHeuristic(self, lst):
        low = 999999999999999999
        low_lst = []
        check = False
        for i in lst:
            if i.visited != True:
                if i.heuristic < low:
                    low = i.heuristic
                    low_lst = i
                    check = True
        if check == False:
            return -1
        return low_lst 

    def BFS(self):
        print('---- Greedy Best First Search ----')
        S = Queue(self.get_random_puzzle())
        print(S.lst)
        S.heuristic = self.calculateHeuristic(S.lst) 
        if S.heuristic == 0:
            return 'Found the goal node'
        self.main.append(S)
        while True:
            u = self.getLowestHeuristic(self.main)
            u.visited = True
            self.display(u.lst)
            n = self.moveElement(u.lst)
            for i in n:
                self.main.append(i)
                if i.heuristic == 0:
                    self.display(i.lst)
                    return "Found the goal node"
        return "Not found"

game = Game()
print(game.BFS())