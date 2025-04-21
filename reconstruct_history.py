import os
import subprocess
from datetime import datetime

def run(cmd, env=None):
    p = subprocess.Popen(cmd, shell=True, env={**os.environ, **(env or {})} , stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    out, err = p.communicate()
    return out.decode(), err.decode(), p.returncode

# 1. Start fresh on an orphan branch
run("git checkout --orphan temp-main")
run("git rm -rf .")

with open("commit_data.txt", "r") as f:
    for line in f:
        if not line.strip(): continue
        hash_val, ts, msg = line.strip().split("|")
        dt = datetime.fromtimestamp(int(ts)).strftime('%Y-%m-%d %H:%M:%S')
        
        # Checkout files from original commit
        run(f"git checkout {hash_val} -- .")
        
        # Commit with original metadata
        env = {
            "GIT_AUTHOR_DATE": f"{dt} +0530",
            "GIT_COMMITTER_DATE": f"{dt} +0530"
        }
        run("git add .")
        run(f'git commit -m \"{msg}\"', env=env)

# 2. Swap branches
run("git branch -D main")
run("git branch -m main")
