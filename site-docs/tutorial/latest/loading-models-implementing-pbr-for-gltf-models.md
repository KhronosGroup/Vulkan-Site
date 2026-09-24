# Loading Models: Implementing PBR for glTF Models

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Loading_Models/05_pbr_rendering.html

## Table of Contents

- [Applying PBR to glTF Models](#_applying_pbr_to_gltf_models)
- [Applying_PBR_to_glTF_Models](#_applying_pbr_to_gltf_models)
- [Building on PBR Knowledge](#_building_on_pbr_knowledge)
- [Building_on_PBR_Knowledge](#_building_on_pbr_knowledge)
- [Leveraging glTF’s PBR Materials](#_leveraging_gltfs_pbr_materials)
- [Leveraging_glTF’s_PBR_Materials](#_leveraging_gltfs_pbr_materials)
- [Implementing PBR in Our Engine](#_implementing_pbr_in_our_engine)
- [Implementing_PBR_in_Our_Engine](#_implementing_pbr_in_our_engine)
- [Uniform Buffer for PBR](#_uniform_buffer_for_pbr)
- [Uniform_Buffer_for_PBR](#_uniform_buffer_for_pbr)
- [Push Constants for Materials](#_push_constants_for_materials)
- [Push_Constants_for_Materials](#_push_constants_for_materials)
- [Setting Up the Descriptor Sets](#_setting_up_the_descriptor_sets)
- [Setting_Up_the_Descriptor_Sets](#_setting_up_the_descriptor_sets)
- [Setting Up the Pipeline](#_setting_up_the_pipeline)
- [Setting_Up_the_Pipeline](#_setting_up_the_pipeline)
- [PBR Shader Implementation](#_pbr_shader_implementation)
- [PBR_Shader_Implementation](#_pbr_shader_implementation)
- [Lighting Setup for PBR](#_lighting_setup_for_pbr)
- [Lighting_Setup_for_PBR](#_lighting_setup_for_pbr)
- [Camera Integration for PBR](#_camera_integration_for_pbr)
- [Camera_Integration_for_PBR](#_camera_integration_for_pbr)
- [Rendering with PBR](#_rendering_with_pbr)
- [Rendering_with_PBR](#_rendering_with_pbr)
- [Advanced PBR Techniques](#_advanced_pbr_techniques)
- [Advanced_PBR_Techniques](#_advanced_pbr_techniques)
- [Image-Based Lighting (IBL)](#_image_based_lighting_ibl)
- [Image-Based_Lighting_(IBL)](#_image_based_lighting_ibl)
- [Subsurface Scattering](#_subsurface_scattering)
- [Clear Coat](#_clear_coat)
- [Anisotropy](#_anisotropy)
- [Conclusion and Next Steps](#_conclusion_and_next_steps)
- [Conclusion_and_Next_Steps](#_conclusion_and_next_steps)

## Content

In the [Lighting & Materials chapter](../Lighting_Materials/01_introduction.html), we explored the fundamentals of Physically Based Rendering (PBR), including its core principles, the BRDF, and material properties. Now, we’ll apply that knowledge to implement a PBR pipeline for the glTF models we’ve loaded.

As we learned in the [glTF and KTX2 Migration chapter](../../15_GLTF_KTX2_Migration.html), glTF uses PBR with the metallic-roughness workflow for its material system. This aligns perfectly with the PBR concepts we’ve already covered, making it straightforward to render our glTF models with physically accurate lighting.

The glTF format already includes all the material properties we need for PBR:

* 
**Base Color**: Defined by the baseColorFactor and baseColorTexture

* 
**Metallic and Roughness**: Defined by metallicFactor, roughnessFactor, and metallicRoughnessTexture

* 
**Normal Maps**: For surface detail without additional geometry

* 
**Occlusion Maps**: For approximating ambient occlusion

* 
**Emissive Maps**: For self-illuminating parts of the material

By using these properties directly, we can ensure our rendering matches the artist’s intent and produces physically accurate results.

Now that we understand the theory behind PBR, let’s implement it in our engine. We’ll build on the material data we loaded from glTF files in the previous chapter.

We need to extend our uniform buffer to include PBR parameters:

// Structure for uniform buffer object
struct UniformBufferObject {
    alignas(16) glm::mat4 model;
    alignas(16) glm::mat4 view;
    alignas(16) glm::mat4 proj;

    // PBR parameters
    alignas(16) glm::vec4 lightPositions[4];  // Position and radius
    alignas(16) glm::vec4 lightColors[4];     // RGB color and intensity
    alignas(16) glm::vec4 camPos;             // Camera position for view-dependent effects
    alignas(4) float exposure = 4.5f;         // Exposure for HDR rendering
    alignas(4) float gamma = 2.2f;            // Gamma correction value
    alignas(4) float prefilteredCubeMipLevels = 1.0f;  // For image-based lighting
    alignas(4) float scaleIBLAmbient = 1.0f;  // Scale factor for ambient lighting
};

This uniform buffer includes:

**Standard Transformation Matrices**: Model, view, and projection matrices for vertex transformation

**Light Information**: Positions and colors of up to four light sources

**Camera Position**: Needed for view-dependent effects like Fresnel

**Rendering Parameters**: Exposure, gamma, and other values for post-processing

**Image-Based Lighting Parameters**: For environment reflections (we’ll cover this in a later chapter)

|  | We introduced push constants earlier in [push constants](../Lighting_Materials/03_push_constants.html); here we focus on how the same mechanism carries glTF metallic‑roughness material knobs efficiently per draw. |
| --- | --- |

We’ll use [push constants](https://www.khronos.org/registry/vulkan/specs/1.2-extensions/html/vkspec.html#descriptorsets-pushconstant) to pass material properties to the shader:

// Structure for push constants
struct PushConstantBlock {
    glm::vec4 baseColorFactor;            // RGB base color and alpha
    float metallicFactor;                 // How metallic the surface is
    float roughnessFactor;                // How rough the surface is
    int baseColorTextureSet;              // Texture coordinate set for base color
    int physicalDescriptorTextureSet;     // Texture coordinate set for metallic-roughness
    int normalTextureSet;                 // Texture coordinate set for normal map
    int occlusionTextureSet;              // Texture coordinate set for occlusion
    int emissiveTextureSet;               // Texture coordinate set for emission
    float alphaMask;                      // Whether to use alpha masking
    float alphaMaskCutoff;                // Alpha threshold for masking
};

Push constants are ideal for material properties because:

* 
They can be updated quickly between draw calls

* 
They don’t require descriptor sets

* 
They’re perfect for per-object data like material properties

To implement PBR, we need to set up descriptor sets for our textures and uniform buffer:

// Create descriptor set layout
void createDescriptorSetLayout() {
    // Binding for uniform buffer
    vk::DescriptorSetLayoutBinding uboBinding{
        .binding = 0,
        .descriptorType = vk::DescriptorType::eUniformBuffer,
        .descriptorCount = 1,
        .stageFlags = vk::ShaderStageFlagBits::eVertex | vk::ShaderStageFlagBits::eFragment
    };

    // Bindings for textures
    std::array textureBindings{};

    // Base color texture
    textureBindings[0].binding = 1;
    textureBindings[0].descriptorType = vk::DescriptorType::eCombinedImageSampler;
    textureBindings[0].descriptorCount = 1;
    textureBindings[0].stageFlags = vk::ShaderStageFlagBits::eFragment;

    // Metallic-roughness texture
    textureBindings[1].binding = 2;
    textureBindings[1].descriptorType = vk::DescriptorType::eCombinedImageSampler;
    textureBindings[1].descriptorCount = 1;
    textureBindings[1].stageFlags = vk::ShaderStageFlagBits::eFragment;

    // Normal map
    textureBindings[2].binding = 3;
    textureBindings[2].descriptorType = vk::DescriptorType::eCombinedImageSampler;
    textureBindings[2].descriptorCount = 1;
    textureBindings[2].stageFlags = vk::ShaderStageFlagBits::eFragment;

    // Occlusion map
    textureBindings[3].binding = 4;
    textureBindings[3].descriptorType = vk::DescriptorType::eCombinedImageSampler;
    textureBindings[3].descriptorCount = 1;
    textureBindings[3].stageFlags = vk::ShaderStageFlagBits::eFragment;

    // Emissive map
    textureBindings[4].binding = 5;
    textureBindings[4].descriptorType = vk::DescriptorType::eCombinedImageSampler;
    textureBindings[4].descriptorCount = 1;
    textureBindings[4].stageFlags = vk::ShaderStageFlagBits::eFragment;

    // Combine all bindings
    std::array bindings = {
        uboBinding,
        textureBindings[0],
        textureBindings[1],
        textureBindings[2],
        textureBindings[3],
        textureBindings[4]
    };

    // Create the descriptor set layout
    vk::DescriptorSetLayoutCreateInfo layoutInfo{
        .bindingCount = static_cast(bindings.size()),
        .pBindings = bindings.data()
    };

    descriptorSetLayout = vk::raii::DescriptorSetLayout(device, layoutInfo);
}

Our PBR pipeline needs to be configured for the specific requirements of physically-based rendering:

void createPipeline() {
    // ... (standard pipeline setup code)

    // Enable alpha blending
    vk::PipelineColorBlendAttachmentState colorBlendAttachment{
        .blendEnable = vk::True,
        .srcColorBlendFactor = vk::BlendFactor::eSrcAlpha,
        .dstColorBlendFactor = vk::BlendFactor::eOneMinusSrcAlpha,
        .colorBlendOp = vk::BlendOp::eAdd,
        .srcAlphaBlendFactor = vk::BlendFactor::eOne,
        .dstAlphaBlendFactor = vk::BlendFactor::eZero,
        .alphaBlendOp = vk::BlendOp::eAdd,
        .colorWriteMask =
            vk::ColorComponentFlagBits::eR |
            vk::ColorComponentFlagBits::eG |
            vk::ColorComponentFlagBits::eB |
            vk::ColorComponentFlagBits::eA
    };

    // Set up push constants for material properties
    vk::PushConstantRange pushConstantRange{
        .stageFlags = vk::ShaderStageFlagBits::eFragment,
        .offset = 0,
        .size = sizeof(PushConstantBlock)
    };

    // Create the pipeline layout
    vk::PipelineLayoutCreateInfo pipelineLayoutInfo{
        .setLayoutCount = 1,
        .pSetLayouts = &descriptorSetLayout,
        .pushConstantRangeCount = 1,
        .pPushConstantRanges = &pushConstantRange
    };

    pipelineLayout = vk::raii::PipelineLayout(device, pipelineLayoutInfo);

    // ... (rest of pipeline creation)
}

The heart of our PBR implementation is in the fragment shader. Here’s a simplified version of a PBR fragment shader written in Slang:

// Input from vertex shader
struct VSOutput {
    float3 WorldPos : POSITION;  // Automatically assigned to location 0
    float3 Normal : NORMAL;      // Automatically assigned to location 1
    float2 UV : TEXCOORD0;       // Automatically assigned to location 2
    float4 Tangent : TANGENT;    // Automatically assigned to location 3
};

// Uniform buffer
struct UniformBufferObject {
    float4x4 model;
    float4x4 view;
    float4x4 proj;
    float4 lightPositions[4];
    float4 lightColors[4];
    float4 camPos;
    float exposure;
    float gamma;
    float prefilteredCubeMipLevels;
    float scaleIBLAmbient;
};

// Push constants for material properties
struct PushConstants {
    float4 baseColorFactor;
    float metallicFactor;
    float roughnessFactor;
    int baseColorTextureSet;
    int physicalDescriptorTextureSet;
    int normalTextureSet;
    int occlusionTextureSet;
    int emissiveTextureSet;
    float alphaMask;
    float alphaMaskCutoff;
};

// Constants
static const float PI = 3.14159265359;

// Bindings
ConstantBuffer ubo;
Texture2D baseColorMap;
SamplerState baseColorSampler;
Texture2D metallicRoughnessMap;
SamplerState metallicRoughnessSampler;
Texture2D normalMap;
SamplerState normalSampler;
Texture2D occlusionMap;
SamplerState occlusionSampler;
Texture2D emissiveMap;
SamplerState emissiveSampler;

[[vk::push_constant]] PushConstants material;

// PBR functions
float DistributionGGX(float NdotH, float roughness) {
    float a = roughness * roughness;
    float a2 = a * a;
    float NdotH2 = NdotH * NdotH;

    float nom = a2;
    float denom = (NdotH2 * (a2 - 1.0) + 1.0);
    denom = PI * denom * denom;

    return nom / denom;
}

float GeometrySmith(float NdotV, float NdotL, float roughness) {
    float r = roughness + 1.0;
    float k = (r * r) / 8.0;

    float ggx1 = NdotV / (NdotV * (1.0 - k) + k);
    float ggx2 = NdotL / (NdotL * (1.0 - k) + k);

    return ggx1 * ggx2;
}

float3 FresnelSchlick(float cosTheta, float3 F0) {
    return F0 + (1.0 - F0) * pow(1.0 - cosTheta, 5.0);
}

// Main fragment shader function
float4 main(VSOutput input) : SV_TARGET
{
    // Sample material textures
    float4 baseColor = baseColorMap.Sample(baseColorSampler, input.UV) * material.baseColorFactor;
    float2 metallicRoughness = metallicRoughnessMap.Sample(metallicRoughnessSampler, input.UV).bg;
    float metallic = metallicRoughness.x * material.metallicFactor;
    float roughness = metallicRoughness.y * material.roughnessFactor;
    float ao = occlusionMap.Sample(occlusionSampler, input.UV).r;  // link:https://learnopengl.com/Advanced-Lighting/SSAO[Ambient occlusion]
    float3 emissive = emissiveMap.Sample(emissiveSampler, input.UV).rgb;  // link:https://learnopengl.com/PBR/Lighting[Emissive lighting] (self-illumination)

    // Calculate normal in link:https://learnopengl.com/Advanced-Lighting/Normal-Mapping[tangent space]
    float3 N = normalize(input.Normal);
    if (material.normalTextureSet >= 0) {
        // Apply link:https://learnopengl.com/Advanced-Lighting/Normal-Mapping[normal mapping]
        float3 tangentNormal = normalMap.Sample(normalSampler, input.UV).xyz * 2.0 - 1.0;
        float3 T = normalize(input.Tangent.xyz);
        float3 B = normalize(cross(N, T)) * input.Tangent.w;
        float3x3 TBN = float3x3(T, B, N);
        N = normalize(mul(tangentNormal, TBN));
    }

    // Calculate view and reflection vectors
    float3 V = normalize(ubo.camPos.xyz - input.WorldPos);
    float3 R = reflect(-V, N);

    // Calculate F0 (base reflectivity)
    float3 F0 = float3(0.04, 0.04, 0.04);
    F0 = lerp(F0, baseColor.rgb, metallic);

    // Initialize lighting
    float3 Lo = float3(0.0, 0.0, 0.0);

    // Calculate lighting for each light
    for (int i = 0; i 

This shader implements the core PBR lighting model, including:

* 
Sampling material textures

* 
Calculating normal mapping

* 
Computing the specular BRDF with D, F, and G terms

* 
Applying energy conservation

* 
Handling multiple light sources

* 
Tone mapping and gamma correction

PBR requires careful setup of light sources to achieve realistic results. Here’s how we can set up lights in our application:

void setupLights() {
    // Set up four lights with different positions and colors
    std::array lightPositions = {
        glm::vec4(-10.0f, 10.0f, 10.0f, 1.0f),
        glm::vec4(10.0f, 10.0f, 10.0f, 1.0f),
        glm::vec4(-10.0f, -10.0f, 10.0f, 1.0f),
        glm::vec4(10.0f, -10.0f, 10.0f, 1.0f)
    };

    std::array lightColors = {
        glm::vec4(300.0f, 300.0f, 300.0f, 1.0f),  // White
        glm::vec4(300.0f, 300.0f, 0.0f, 1.0f),    // Yellow
        glm::vec4(0.0f, 0.0f, 300.0f, 1.0f),      // Blue
        glm::vec4(300.0f, 0.0f, 0.0f, 1.0f)       // Red
    };

    // Update uniform buffer with light data
    for (size_t i = 0; i 

PBR relies on view-dependent effects like the Fresnel effect, so we need to integrate our camera system:

void updateUniformBuffer(uint32_t currentFrame) {
    UniformBufferObject ubo{};

    // Update transformation matrices
    ubo.model = glm::mat4(1.0f);  // Or get from the model's node
    ubo.view = camera.getViewMatrix();
    ubo.proj = camera.getProjectionMatrix(swapChainExtent.width / (float)swapChainExtent.height);

    // Vulkan's Y coordinate is inverted compared to OpenGL
    ubo.proj[1][1] *= -1;

    // Update camera position for PBR calculations
    ubo.camPos = glm::vec4(camera.getPosition(), 1.0f);

    // ... (update other PBR parameters)

    // Copy to uniform buffer (per frame-in-flight)
    memcpy(uniformBuffers[currentFrame].mapped, &ubo, sizeof(ubo));
}

Finally, let’s put it all together to render our models with PBR:

void drawModel(vk::raii::CommandBuffer& commandBuffer, Model* model) {
    // Bind descriptor set with uniform buffer and textures
    commandBuffer.bindDescriptorSets(
        vk::PipelineBindPoint::eGraphics,
        pipelineLayout,
        0,
        1,
        &descriptorSets[currentFrame],
        0,
        nullptr
    );

    // Traverse the model's scene graph
    for (auto& node : model->linearNodes) {
        if (node->mesh.indices.size() > 0) {
            // Get the global transformation matrix
            glm::mat4 nodeMatrix = node->getGlobalMatrix();

            // Update model matrix in uniform buffer
            // (In a real implementation, we'd use a separate UBO for each model)

            // Set up push constants for material properties
            if (node->mesh.materialIndex >= 0) {
                Material& mat = model->materials[node->mesh.materialIndex];

                PushConstantBlock pushConstants{};
                pushConstants.baseColorFactor = mat.baseColorFactor;
                pushConstants.metallicFactor = mat.metallicFactor;
                pushConstants.roughnessFactor = mat.roughnessFactor;
                pushConstants.baseColorTextureSet = mat.baseColorTextureIndex;
                pushConstants.physicalDescriptorTextureSet = mat.metallicRoughnessTextureIndex;
                pushConstants.normalTextureSet = mat.normalTextureIndex;
                pushConstants.occlusionTextureSet = mat.occlusionTextureIndex;
                pushConstants.emissiveTextureSet = mat.emissiveTextureIndex;

                commandBuffer.pushConstants(
                    pipelineLayout,
                    vk::ShaderStageFlagBits::eFragment,
                    0,
                    sizeof(PushConstantBlock),
                    &pushConstants
                );
            }

            // Bind vertex and index buffers
            vk::Buffer vertexBuffers[] = {*node->mesh.vertexBuffer};
            vk::DeviceSize offsets[] = {0};
            commandBuffer.bindVertexBuffers(0, 1, vertexBuffers, offsets);
            commandBuffer.bindIndexBuffer(*node->mesh.indexBuffer, 0, vk::IndexType::eUint32);

            // Draw the mesh
            commandBuffer.drawIndexed(
                static_cast(node->mesh.indices.size()),
                1,
                0,
                0,
                0
            );
        }
    }
}

While we’ve covered the basics of PBR implementation, there are several advanced techniques that can enhance the realism of your rendering:

[IBL](https://learnopengl.com/PBR/IBL/Diffuse-irradiance) uses environment maps to simulate global illumination:
* **Diffuse IBL**: Uses [irradiance maps](https://learnopengl.com/PBR/IBL/Diffuse-irradiance) for ambient lighting
* **Specular IBL**: Uses [pre-filtered environment maps](https://learnopengl.com/PBR/IBL/Specular-IBL) and [BRDF integration maps](https://learnopengl.com/PBR/IBL/Specular-IBL) for reflections

For materials like skin, wax, or marble where light penetrates the surface:

* 
[Simulates how light scatters within translucent materials](https://developer.nvidia.com/gpugems/gpugems3/part-iii-rendering/chapter-14-advanced-techniques-realistic-real-time-skin)

* 
Can be approximated with techniques like subsurface scattering profiles

For materials with a thin, glossy layer on top:

* 
[Automotive paint, varnished wood, etc.](https://github.com/KhronosGroup/glTF/tree/master/extensions/2.0/Khronos/KHR_materials_clearcoat)

* 
Implemented as an additional specular lobe

For materials with directional reflections:

* 
[Brushed metal, hair, fabric, etc.](https://google.github.io/filament/Filament.html#materialsystem/anisotropicmodel)

* 
Requires additional material parameters and modified BRDFs

In this chapter, we’ve applied the PBR knowledge from the Lighting & Materials chapter to implement a PBR pipeline for our glTF models. We’ve learned:

* 
How to leverage the material properties from glTF for PBR rendering

* 
How to set up uniform buffers and push constants for PBR parameters

* 
How to implement a PBR shader that works with glTF materials

* 
How to integrate our camera system with PBR for view-dependent effects

* 
How to render glTF models with physically accurate lighting

This implementation allows us to render the glTF models we loaded in the previous chapter with physically accurate materials, resulting in more realistic and consistent rendering across different lighting conditions.

In the next chapter, we’ll explore how to render multiple objects with different transformations, which will allow us to create more complex scenes with our PBR-enabled engine.

If you want to dive deeper into lighting and materials, refer back to the Lighting & Materials chapter, where we explored the theory behind PBR in detail.

[Previous: Loading a glTF Model](04_loading_gltf.html) | [Next: Rendering Multiple Objects](06_multiple_objects.html)
