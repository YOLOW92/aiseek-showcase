for command in '' 'release main' 'release ../../etc' 'release aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa;id' 'activate aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'; do
  if SSH_ORIGINAL_COMMAND="$command" bash deploy/server-ci/receive.sh </dev/null; then
    echo "accepted unsafe command: $command"; exit 1
  fi
done
