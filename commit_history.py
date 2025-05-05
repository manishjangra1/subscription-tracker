import os
import subprocess
import sys
from datetime import datetime

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
    # Ensure correct format for git
    # Expected format: "YYYY-MM-DD HH:MM:SS"
    env = {
        "GIT_AUTHOR_DATE": f"{date_str} +0530",
        "GIT_COMMITTER_DATE": f"{date_str} +0530"
    }
    
    print(f"Adding files and committing for date: {date_str}")
    run_command("git add .")
    run_command(f'git commit -m "{message}"', env=env)

if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python commit_history.py '<date>' '<message>'")
        sys.exit(1)
    
    date_input = sys.argv[1]
    message_input = sys.argv[2]
    commit_with_date(date_input, message_input)
