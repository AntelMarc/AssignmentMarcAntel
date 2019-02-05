import sys
w = sys.stdout.write
def tree(n):
    for i in range(int(n/2) + 1):
        for a in range(n-i):
            w(" ")
        for l in range(i<<1):
                w("*")
        print("*")
    for o in range(2):
        for i in range(n):
            w(" ")
        print("|")

tree(int(sys.argv[1]))