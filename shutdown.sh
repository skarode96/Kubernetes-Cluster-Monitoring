kubectl delete deploy/frontend &
kubectl delete deploy/redis-master &
kubectl delete deploy/redis-slave &
kubectl delete service/redis-master &
kubectl delete service/redis-slave &
kubectl delete service/frontend &
kubectl delete service/packets-api-redis-master &
kubectl delete service/packets-api-frontend &
kubectl delete service/packets-api-redis-slave


