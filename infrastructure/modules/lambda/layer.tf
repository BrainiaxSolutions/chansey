# resource "aws_lambda_layer_version" "lambda_layer" {
#   layer_name = var.lambda_function_layer_name
#   s3_bucket  = var.lambda_function_layer_s3_bucket
#   s3_key     = var.lambda_function_layer_s3_key

#   compatible_runtimes = [var.lambda_function_runtime]
# }

# resource "aws_s3_bucket_object" "lambda_layer" {
#   bucket = var.lambda_function_layer_s3_bucket
#   key    = "${var.lambda_function_name}/lambda-layer.zip"
#   source = var.lambda_function_layer_source_code_path
# }

resource "aws_lambda_layer_version" "lambda_layer" {
  filename         = data.archive_file.deps_layer_code_zip.output_path
  source_code_hash = data.archive_file.deps_layer_code_zip.output_base64sha256
  layer_name       = var.lambda_function_layer_name

  compatible_runtimes = [var.lambda_function_runtime]
}

data "archive_file" "deps_layer_code_zip" {
  type        = "zip"
  source_dir  = "${path.module}/../../../node_modules/"
  output_path = "${path.module}/../../../node_modules/deps.zip"
}