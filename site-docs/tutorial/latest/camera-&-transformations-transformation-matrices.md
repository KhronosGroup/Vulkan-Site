# Camera & Transformations: Transformation Matrices

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Camera_Transformations/03_transformation_matrices.html

## Table of Contents

- [Transformation Matrices](#_transformation_matrices)
- [The Model-View-Projection (MVP) Pipeline](#_the_model_view_projection_mvp_pipeline)
- [The_Model-View-Projection_(MVP)_Pipeline](#_the_model_view_projection_mvp_pipeline)
- [Model Matrix](#_model_matrix)
- [View Matrix](#_view_matrix)
- [Projection Matrix](#_projection_matrix)
- [Perspective Projection](#_perspective_projection)
- [Orthographic Projection](#_orthographic_projection)
- [Normal Matrix](#_normal_matrix)
- [Applying Transformations in Shaders](#_applying_transformations_in_shaders)
- [Applying_Transformations_in_Shaders](#_applying_transformations_in_shaders)
- [Hierarchical Transformations](#_hierarchical_transformations)

## Content

In this section, we’ll dive deeper into the transformation matrices used in 3D graphics and how they’re applied in our rendering pipeline.

The transformation of vertices from object space to screen space involves a series of matrix multiplications, commonly known as the MVP pipeline:

// The complete transformation pipeline
glm::mat4 MVP = projectionMatrix * viewMatrix * modelMatrix;

Let’s explore each of these matrices in detail.

The model matrix transforms vertices from object space to world space. It positions, rotates, and scales objects in the world.

glm::mat4 createModelMatrix(
    const glm::vec3& position,
    const glm::vec3& rotation,
    const glm::vec3& scale
) {
    // Start with identity matrix
    glm::mat4 model = glm::mat4(1.0f);

    // Apply transformations in order: scale, rotate, translate
    model = glm::translate(model, position);

    // Apply rotations around each axis
    model = glm::rotate(model, glm::radians(rotation.x), glm::vec3(1.0f, 0.0f, 0.0f));
    model = glm::rotate(model, glm::radians(rotation.y), glm::vec3(0.0f, 1.0f, 0.0f));
    model = glm::rotate(model, glm::radians(rotation.z), glm::vec3(0.0f, 0.0f, 1.0f));

    // Apply scaling
    model = glm::scale(model, scale);

    return model;
}

The view matrix transforms vertices from world space to view space (camera space). It represents the position and orientation of the camera.

glm::mat4 createViewMatrix(
    const glm::vec3& cameraPosition,
    const glm::vec3& cameraTarget,
    const glm::vec3& upVector
) {
    return glm::lookAt(cameraPosition, cameraTarget, upVector);
}

The `lookAt` function creates a view matrix that positions the camera at `cameraPosition`, looking at `cameraTarget`, with `upVector` defining the up direction.

The projection matrix transforms vertices from view space to clip space. It defines how 3D coordinates are projected onto the 2D screen.

Perspective projection simulates how objects appear smaller as they get farther away, which is how our eyes naturally perceive the world.

glm::mat4 createPerspectiveMatrix(
    float fovY,
    float aspectRatio,
    float nearPlane,
    float farPlane
) {
    return glm::perspective(glm::radians(fovY), aspectRatio, nearPlane, farPlane);
}

Parameters:

* 
`fovY`: Field of view angle in degrees (vertical)

* 
`aspectRatio`: Width divided by height of the viewport

* 
`nearPlane`: Distance to the near clipping plane

* 
`farPlane`: Distance to the far clipping plane

Orthographic projection doesn’t have perspective distortion, making it useful for 2D rendering or technical drawings.

glm::mat4 createOrthographicMatrix(
    float left,
    float right,
    float bottom,
    float top,
    float nearPlane,
    float farPlane
) {
    return glm::ortho(left, right, bottom, top, nearPlane, farPlane);
}

When applying non-uniform scaling to objects, normals can become incorrect if transformed with the model matrix. The normal matrix solves this issue:

glm::mat3 createNormalMatrix(const glm::mat4& modelMatrix) {
    // The normal matrix is the transpose of the inverse of the upper-left 3x3 part of the model matrix
    return glm::transpose(glm::inverse(glm::mat3(modelMatrix)));
}

In Vulkan, we typically pass these matrices to our shaders as uniform variables:

// Vertex shader
#version 450

layout(binding = 0) uniform UniformBufferObject {
    mat4 model;
    mat4 view;
    mat4 proj;
} ubo;

layout(location = 0) in vec3 inPosition;
layout(location = 1) in vec3 inNormal;
layout(location = 2) in vec2 inTexCoord;

layout(location = 0) out vec3 fragNormal;
layout(location = 1) out vec2 fragTexCoord;

void main() {
    // Apply MVP transformation
    gl_Position = ubo.proj * ubo.view * ubo.model * vec4(inPosition, 1.0);

    // Transform normal using normal matrix
    mat3 normalMatrix = transpose(inverse(mat3(ubo.model)));
    fragNormal = normalMatrix * inNormal;

    fragTexCoord = inTexCoord;
}

For complex objects or scenes with parent-child relationships, we use hierarchical transformations:

// Parent transformation
glm::mat4 parentModel = createModelMatrix(parentPosition, parentRotation, parentScale);

// Child transformation relative to parent
glm::mat4 localModel = createModelMatrix(childLocalPosition, childLocalRotation, childLocalScale);

// Combined transformation
glm::mat4 childWorldModel = parentModel * localModel;

In the next section, we’ll implement a camera system that uses these transformation concepts to navigate our 3D scenes.

[Previous: Mathematical Foundations](02_math_foundations.html) | [Next: Camera Implementation](04_camera_implementation.html)
