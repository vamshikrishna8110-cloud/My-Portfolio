export const person = {
  name: 'Venkat Laxmi Narsimha Krishna Vamshi Akula',
  email: 'vamshikrishna8110@gmail.com',
  linkedin: 'https://www.linkedin.com/in/venkat-akula-',
}

export const projects = [
  {
    title: 'Donor Search Knowledge Assistant',
    client: 'NMDP',
    area: 'Retrieval & agentic AI',
    description: 'A retrieval-augmented assistant that helps transplant coordinators find guidance in approved documentation.',
    stack: ['Azure OpenAI', 'Azure AI Search', 'LangGraph', 'FastAPI'],
    details: 'Combined BM25, vector search, and semantic reranking to retrieve relevant guidance. Orchestrated authorized tools and human review with LangChain, LangGraph, and MCP. Used Ragas and DeepEval to evaluate groundedness, retrieval quality, and citation accuracy before broader releases.',
  },
  {
    title: 'Student Loan Risk Modeling',
    client: 'Sallie Mae Bank',
    area: 'Applied machine learning',
    description: 'A full-stack platform that brought predictive insights and model explanations into analyst review workflows.',
    stack: ['Python', 'React', 'XGBoost', 'Vertex AI'],
    details: 'Built React dashboards and FastAPI prediction services on GCP. Compared models using temporal holdouts and calibration checks, and supported independent model validation with SHAP explanations, bias testing, and documented feature lineage.',
  },
  {
    title: 'MD THINK Human Services Integration',
    client: 'State of Maryland',
    area: 'Backend & cloud',
    description: 'Backend components that supported data exchange across Maryland human services systems.',
    stack: ['Flask', 'AWS', 'SQL', 'Amazon S3'],
    details: 'Built REST integrations and incremental ETL with reconciliation checks to support controlled migration from legacy systems. Reviewed SQL execution plans and introduced indexing, pagination, and selective filtering.',
  },
  {
    title: 'Grocery Catalog & Availability',
    client: 'Publix Super Markets',
    area: 'Data engineering',
    description: 'An integration that supported partner catalog exchanges and product availability updates across stores.',
    stack: ['Python', 'SQL', 'Pandas', 'SFTP'],
    details: 'Built ETL pipelines for catalog and availability feeds, standardized incoming records, and added timestamp filtering and indexing to reduce repeated processing. Added automated failure notifications to help teams investigate failed jobs.',
  },
  {
    title: 'Laboratory Sample & Batch Tracking',
    client: 'Dr. Reddy’s Laboratories',
    area: 'Backend & reporting',
    description: 'Backend modules for sample tracking, batch management, and quality reporting.',
    stack: ['Django', 'PostgreSQL', 'Pandas', 'OpenPyXL'],
    details: 'Automated imports from CSV, Excel, and PostgreSQL. Developed validation routines for out-of-specification results and used OpenPyXL to automate Excel reporting.',
  },
]

export const experience = [
  { role: 'Senior AI Engineer', client: 'NMDP', location: 'Minneapolis, MN', dates: 'Dec 2023 – Present', summary: 'Developed a donor search knowledge assistant and event-driven AI services. Built evaluation gates into Azure DevOps releases and instrumented retrieval, latency, and tool errors with OpenTelemetry.' },
  { role: 'Full Stack AI/ML Engineer', client: 'Sallie Mae Bank', location: 'Newark, DE', dates: 'Apr 2021 – Dec 2023', summary: 'Built loan risk modeling workflows on GCP, connected React dashboards to FastAPI prediction services, and monitored model drift with Evidently AI.' },
  { role: 'Senior Software Engineer', client: 'State of Maryland', location: 'Baltimore, MD', dates: 'Jan 2019 – Apr 2021', summary: 'Developed MD THINK backend services on AWS. Implemented incremental data migrations and optimized SQL queries for shared human services workflows.' },
  { role: 'Python Data Engineer', client: 'Publix Super Markets', location: 'Lakeland, FL', dates: 'Mar 2017 – Jan 2019', summary: 'Developed catalog and inventory feed pipelines, validated partner data, and added monitoring for batch processing and reconciliation.' },
  { role: 'Python Developer', client: 'Dr. Reddy’s Laboratories', location: 'Hyderabad, India', dates: 'Nov 2014 – Dec 2016', summary: 'Built Django modules for laboratory tracking and reporting, automated ingestion and validation, and supported deployments on Linux.' },
]

export const skills = [
  { title: 'Generative AI & retrieval', stack: ['Azure OpenAI', 'GPT-4.1', 'RAG', 'LangChain', 'LangGraph', 'MCP', 'Azure AI Search', 'BM25', 'Semantic reranking', 'Ragas', 'DeepEval'] },
  { title: 'Machine learning', stack: ['scikit-learn', 'XGBoost', 'TensorFlow', 'PyTorch', 'SHAP', 'Vertex AI', 'MLflow', 'Evidently AI'] },
  { title: 'Backend & APIs', stack: ['Python', 'FastAPI', 'Pydantic', 'Flask', 'Django', 'REST', 'OAuth 2.0', 'OpenAPI', 'React'] },
  { title: 'Data engineering', stack: ['SQL', 'Pandas', 'PySpark', 'Azure Databricks', 'Snowflake', 'BigQuery', 'PostgreSQL', 'ETL'] },
  { title: 'Cloud & infrastructure', stack: ['Azure', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'Terraform', 'Helm', 'Azure DevOps', 'Jenkins'] },
  { title: 'Observability & testing', stack: ['OpenTelemetry', 'Azure Monitor', 'Application Insights', 'Prometheus', 'Grafana', 'pytest', 'LLM evaluation'] },
]
