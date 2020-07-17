kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-deployment.yaml &&
kubectl get pods &&
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-master-service.yaml &&
kubectl get service &&
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-deployment.yaml &&
kubectl get pods &&
kubectl apply -f https://k8s.io/examples/application/guestbook/redis-slave-service.yaml &&
kubectl get services &&
kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-deployment.yaml &&
kubectl apply -f https://k8s.io/examples/application/guestbook/frontend-service.yaml &&
kubectl get services &&
minikube service frontend --url

