import os
import subprocess
import sys
from datetime import datetime, timedelta
import random

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
        return None
    return stdout.decode()

def commit_with_date(date_obj, message):
    # Format: "YYYY-MM-DD HH:MM:SS"
    date_str = date_obj.strftime("%Y-%m-%d %H:%M:%S")
    env = {
        "GIT_AUTHOR_DATE": f"{date_str} +0530",
        "GIT_COMMITTER_DATE": f"{date_str} +0530"
    }
    
    run_command("git add .")
    # Use -m with quotes, and handle potential special characters
    result = run_command(f'git commit -m "{message}"', env=env)
    if result:
        print(f"[{date_str}] {message}")

def get_random_time(date_obj):
    # Random time between 09:00 and 23:00
    hour = random.randint(9, 22)
    minute = random.randint(0, 59)
    second = random.randint(0, 59)
    return date_obj.replace(hour=hour, minute=minute, second=second)

# This script will be called with specific chunks of work
if __name__ == "__main__":
    pass
