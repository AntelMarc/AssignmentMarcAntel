import sys
w = sys.stdout.write
def tree(n):
    for i in range(n):
        for a in range(int((n-i)/2)):
            w(" ")
        for l in range(i):
                w("*")
        print("*")
    for o in range(2):
        for i in range(int(n/2)):
            w(" ")
        print("|")

tree(int(sys.argv[1]))