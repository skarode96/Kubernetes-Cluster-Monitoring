# K8-Pod-Monitoring

### Commands

run locally

```
sudo /home/sameer/projects/K8-Pod-Monitoring/venv/bin/python3 sniffer/sniff_packets.py test --filter="tcp port 80"
```



get deployment yaml
```
kubectl get deployment frontend --output yaml
```

ssh into a container of pod
```
kubectl exec -i -t my-pod --container main-app -- /bin/bash
kubectl exec -i -t frontend-6c459b5765-bhz4d --container php-redis -- /bin/bash
```

get a shell into a pod
```
kubectl exec --stdin --tty frontend-6c459b5765-bhz4d -- /bin/bash
```

describe a pod
```
kubectl describe pod frontend-5b8bfdc864-xjqd2

```
activate minikube's docker env before running any docker build command
```
  eval $(minikube docker-env) 
```