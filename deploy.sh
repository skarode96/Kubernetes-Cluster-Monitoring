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

kubectl apply -f deployments/packets-api-frontend-service.yaml &&
kubectl apply -f deployments/packets-api-redis-master-service.yaml &&
kubectl apply -f deployments/packets-api-redis-slave-service.yaml &&


kubectl get services &&
echo 'frontend' $`minikube service frontend --url`
echo 'packets-api-frontend' $`minikube service packets-api-frontend --url`'/api/packets'
echo 'packets-api-redis-master-service' $`minikube service packets-api-redis-master --url`'/api/packets'
echo 'packets-api-redis-slave-service' $`minikube service packets-api-redis-slave --url`'/api/packets'
3
