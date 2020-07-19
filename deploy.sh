kubectl apply -f deployments/redis-master-deployment.yaml &&
kubectl get pods &&
kubectl apply -f deployments/redis-master-service.yaml &&
kubectl get service &&
kubectl apply -f deployments/redis-slave-deployment.yaml &&
kubectl get pods &&
kubectl apply -f deployments/redis-slave-service.yaml &&
kubectl get services &&
kubectl apply -f deployments/frontend-deployment.yaml &&
kubectl apply -f deployments/frontend-service.yaml &&
kubectl apply -f deployments/packets-api-service.yaml &&


kubectl get services &&
minikube service frontend --url
minikube service packets-api --url

