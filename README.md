🚀 Task-1: AWS CI/CD Pipeline with Terraform & Terratest
📌 Overview
This project builds a fully automated AWS CI/CD pipeline using:

Terraform → Infrastructure as Code (IaC)

Terratest → Automated infrastructure testing

AWS Services → CodePipeline, CodeBuild, CodeDeploy, ECS, ECR, S3, ALB

✅ Goal: Provision, test, and deploy AWS infrastructure with a secure, modular, and automated approach.

📂 Repository Structure
css
Copy
Edit
task1/
├── modules/
│   ├── alb/
│   ├── codebuild/
│   ├── codepipeline/
│   ├── ecr/
│   ├── ecs/
│   ├── iam/
│   ├── s3/
│   └── vpc/
├── main.tf
├── variables.tf
├── terraform.tfvars
├── outputs.tf
└── terratest/
    ├── buildspec.yml
    └── terratest_test.go
⚙️ Infrastructure Provisioning
Step	Command	Description
1️⃣	terraform init	Initialize Terraform backend and providers
2️⃣	terraform plan -var-file="terraform.tfvars"	Review execution plan
3️⃣	terraform apply -var-file="terraform.tfvars"	Deploy infrastructure

Provisioned AWS Components:
✔ VPC, Subnets, Security Groups
✔ IAM Roles & Policies
✔ S3 Buckets (Artifact Storage)
✔ ECR (Container Registry)
✔ ECS Cluster + Application Load Balancer
✔ AWS CodePipeline, CodeBuild, CodeDeploy

✅ Testing with Terratest
Step	Command
🗑 Destroy old resources	terraform destroy -var-file="terraform.tfvars"
▶ Run tests	cd terratest && go test -v

Checks:

✅ All tests should pass

✅ Verify ALB DNS and Terraform outputs

🔑 Prerequisites
Tool	Version Required
Terraform	v1.0+
Go (Terratest)	1.18+
AWS CLI	Configured with correct permissions
Git	Installed

✅ How to Use This Project
1. Clone the Repository
bash
Copy
Edit
git clone https://github.com/priyanshu-t07/task1-test.git task1
cd task1
2. Set Up Environment
Install AWS CLI, Terraform v1.0+, Go 1.18+, and Git

Configure AWS:

bash
Copy
Edit
aws configure
(Provide Access Key, Secret Key, region, and output format)

3. Initialize Terraform
bash
Copy
Edit
terraform init
4. Review the Execution Plan
bash
Copy
Edit
terraform plan -var-file="terraform.tfvars"
5. Apply Infrastructure
bash
Copy
Edit
terraform apply -var-file="terraform.tfvars"
Confirm with yes.
✅ AWS resources (VPC, ECS, ECR, ALB, CodePipeline, etc.) will be created.

6. Validate Infrastructure with Terratest
bash
Copy
Edit
terraform destroy -var-file="terraform.tfvars"
cd terratest
go test -v
Ensure all tests pass.

7. Destroy Infrastructure (Optional)
bash
Copy
Edit
terraform destroy -var-file="terraform.tfvars"
📝 Additional Notes
Each AWS resource is modular → clean & maintainable code.

buildspec.yml defines CodeBuild build steps.

Ensure AWS credentials are properly set before running.

