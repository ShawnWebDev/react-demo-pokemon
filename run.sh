echo "building docker image"

docker build -t react-img .

echo "** running docker container on port 5173 **"

docker run --rm \
    -p 5173:5173 \
    -v "$(pwd)":/app \
    -v /app/node_modules \
    --name react-container \
    react-img

    