import os
import requests
import zipfile

TOKEN = "nfp_vdBsFoFz1Zwaeu9PTDc5bGj9ELAWeZsh1d60"
ZIP_PATH = r"C:\Users\this pc\.gemini\antigravity\scratch\bajaj-anshika\deploy.zip"

def deploy():
    print("Step 1: Creating a new site on Netlify...")
    create_site_url = "https://api.netlify.com/api/v1/sites"
    headers = {"Authorization": f"Bearer {TOKEN}"}
    
    # Create the site
    site_response = requests.post(create_site_url, headers=headers, json={"name": "anshika-bajaj-fullstack-" + os.urandom(2).hex()})
    if site_response.status_code != 201:
        # If name taken, try random
        site_response = requests.post(create_site_url, headers=headers)
        
    site_data = site_response.json()
    site_id = site_data['id']
    site_url = site_data['url']
    print(f"Site created: {site_url} (ID: {site_id})")

    print("Step 2: Uploading ZIP file...")
    with open(ZIP_PATH, 'rb') as f:
        upload_url = f"https://api.netlify.com/api/v1/sites/{site_id}/deploys"
        headers["Content-Type"] = "application/zip"
        upload_response = requests.post(upload_url, headers=headers, data=f)
    
    if upload_response.status_code in [200, 201]:
        print("Successfully deployed!")
        print(f"FINAL URL: {site_url}")
    else:
        print(f"Upload failed: {upload_response.text}")

if __name__ == "__main__":
    deploy()
