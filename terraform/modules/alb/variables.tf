variable "vpc_id" {
  type = string
}

variable "public_subnets" {
  type = list(string)
}

variable "project_name" {
  type = string
}
