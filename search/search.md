# Search 

자료 탐색이란 원하는 자료를 찾는 작업을 말한다. 

원초적인 방법으로 2가지가 있는데 BFS(깊이 우선 탐색), DFS(너비 우선 탐색)이 있다. 
두가지 모두 모든 자료를 하나 하나 다 확인해 본다는 공통점을 가지고 있다. 

## BFS
한 단계 씩 가능한 모든 경우의 수를 확인 
필요한 자료 구조: Queue가 필
Queue의 구조 - 줄을 서서 기다리는 것과 비슷, FIFO 먼저 넣은 것을 먼저 꺼낸다 

```python
def BFS(start_node):
    queue = [start_node, ]
    while True:
        # queue 가 비어 있는지 확인
        if len(queue) == 0:
            return None
        # queue 에서 맨 앞의 노드를 dequeue
        node = queue.pop(0)
    
        # 만약 노드가 찾는 타겟이면? 서치 중단
        if node == TARGET:
            return node
        
        children = expand(node)
        queue.extend(children)


```


## DFS
한 우물만 파고들며 가능한 수가 나올 떄까지 확인 
필요한 자료 구조는 Stack이 필요하다
Stack 의 구조 - LIFO 마지막에 들어간 자료를 먼저 꺼낸다 

```python
def DFS(start_node):
    # stack 에 첫번째 노드 넣으면서 시작
    stack = [start_node, ]
    while True:
        # stack 이 비어있는지 확인
        if len(stack) == 0:
            print("All node Searched")
            return None
        
        # stack에서 맨 위의 노드를 pop
        node = stack.pop()
        # node 가 target 이라면 서치 중단
        if node == TARGET:
            return node
        # node의 자식을 expand 해서 children에 저장
        children = expand(node)
        
        # children을 stack에 쌓기
        stack.extend(children)

```

