echo "build-prod"
cd /$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME
cp -r /usr/src/app/node_modules /$CI_PROJECT_NAMESPACE/$CI_PROJECT_NAME/node_modules
{
  npm run build &&
  curl --header "Content-Type:application/json" --request POST --data '{"body":":heavy_check_mark: Build SUCCESS"}' http://172.16.1.41:10080/api/v4/projects/$CI_MERGE_REQUEST_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes?private_token=PqB2N52iR4EC9LYznRxz
} || {
  curl --header "Content-Type:application/json" --request POST --data '{"body":":x: Build FAILURE"}' http://172.16.1.41:10080/api/v4/projects/$CI_MERGE_REQUEST_PROJECT_ID/merge_requests/$CI_MERGE_REQUEST_IID/notes?private_token=PqB2N52iR4EC9LYznRxz
  exit 1
}
