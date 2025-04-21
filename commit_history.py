import os
import subprocess
import sys

def run_command(command, env=None):
    process = subprocess.Popen(
        command,
        stdout=subprocess.PIPE,
        stderr=subprocess.PIPE,
        shell=True,
        env={**os.environ, **(env or {})}
    )
    stdout, stderr = process.communicate()
    if process.returncode != 0:
        print(f"Error: {stderr.decode()}")
        sys.exit(1)
    return stdout.decode()

def commit_with_date(date_str, message):
    env = {
        "GIT_AUTHOR_DATE": f"{date_str} +0530",
        "GIT_COMMITTER_DATE": f"{date_str} +0530"
    }
    run_command("git add .")
    run_command(f'git commit -m "{message}"', env=env)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python commit_history.py '<date>' '<message>'")
        sys.exit(1)
    commit_with_date(sys.argv[1], sys.argv[2])
