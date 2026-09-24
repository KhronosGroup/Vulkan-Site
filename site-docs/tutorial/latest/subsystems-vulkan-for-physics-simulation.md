# Subsystems: Vulkan for Physics Simulation

## Metadata

- **Component**: tutorial
- **Version**: latest
- **URL**: /tutorial/latest/Building_a_Simple_Engine/Subsystems/05_vulkan_physics.html

## Table of Contents

- [Enhancing Physics with Vulkan](#_enhancing_physics_with_vulkan)
- [Enhancing_Physics_with_Vulkan](#_enhancing_physics_with_vulkan)
- [Why Use Vulkan for Physics?](#_why_use_vulkan_for_physics)
- [Why_Use_Vulkan_for_Physics?](#_why_use_vulkan_for_physics)
- [Common GPU Physics Applications](#_common_gpu_physics_applications)
- [Common_GPU_Physics_Applications](#_common_gpu_physics_applications)
- [GPU-Accelerated Rigid Body Physics](#_gpu_accelerated_rigid_body_physics)
- [GPU-Accelerated_Rigid_Body_Physics](#_gpu_accelerated_rigid_body_physics)
- [Physics Compute Shaders](#_physics_compute_shaders)
- [Physics_Compute_Shaders](#_physics_compute_shaders)
- [Performance Considerations](#_performance_considerations)
- [Integration with the Engine](#_integration_with_the_engine)
- [Integration_with_the_Engine](#_integration_with_the_engine)
- [Advantages of Vulkan-Based Physics](#_advantages_of_vulkan_based_physics)
- [Advantages_of_Vulkan-Based_Physics](#_advantages_of_vulkan_based_physics)
- [Limitations and Considerations](#_limitations_and_considerations)
- [Limitations_and_Considerations](#_limitations_and_considerations)
- [Real-World Applications](#_real_world_applications)
- [Conclusion](#_conclusion)

## Content

In the previous section, we implemented a basic physics system for our engine. Now, we’ll explore how Vulkan’s compute capabilities can enhance physics simulations, particularly for large-scale scenarios with many interacting objects.

Traditional physics simulations are performed on the CPU, but there are several compelling reasons to leverage Vulkan compute shaders for physics calculations:

**Parallelism**: Physics calculations for multiple objects can be performed in parallel, making them well-suited for GPU computation.

**Scalability**: GPU-based physics can handle thousands or even millions of objects with relatively little performance degradation.

**Reduced CPU Load**: Offloading physics to the GPU frees up CPU resources for game logic, AI, and other tasks.

**Unified Memory**: With Vulkan, we can share memory between physics and graphics, reducing data transfer overhead.

**Specialized Hardware**: Modern GPUs often include hardware features specifically designed to accelerate physics-like calculations.

While not all physics calculations are suitable for GPU acceleration, several common physics tasks can benefit significantly:

**Particle Systems**: Simulating thousands of particles for effects like smoke, fire, or fluid.

**Cloth Simulation**: Calculating the behavior of cloth, hair, or other deformable objects.

**Soft Body Physics**: Simulating objects that can bend, stretch, or compress.

**Broad-Phase Collision Detection**: Quickly identifying potential collision pairs among many objects.

**Rigid Body Dynamics**: Simulating the movement of large numbers of rigid bodies.

Let’s focus on implementing GPU-accelerated rigid body dynamics and collision detection using Vulkan compute shaders.

To implement GPU-accelerated physics, we’ll need to:

Store physics data in GPU-accessible buffers

Create compute shaders to perform physics calculations

Integrate the GPU physics with our existing CPU-based system

Let’s extend our physics system to include Vulkan-accelerated components. We’ll approach it in four steps:

1) Step 1: Data layout (GPUPhysicsData/GPUCollisionData structures)
2) Step 2: GPU resource setup (descriptor set layout, pipelines, storage buffers, descriptor sets)
3) Step 3: Simulation dispatch (integrate → broad‑phase → narrow‑phase → resolve with pipeline barriers)
4) Step 4: Synchronization and readback (update GPU buffers, submit, read back state, integrate in Update)

|  | We avoid repeating Vulkan compute fundamentals here; focus stays on physics‑specific wiring. Use earlier chapters ([Resource Management](../Engine_Architecture/04_resource_management.html), [Rendering Pipeline](../Engine_Architecture/05_rendering_pipeline.html)) or the Vulkan Guide ([https://docs.vulkan.org/guide/latest/](https://docs.vulkan.org/guide/latest/)) if you need a refresher on descriptors, buffers, or pipeline creation. |
| --- | --- |

// Physics.h (additions)
#include 

namespace Engine {
namespace Physics {

// Structure for GPU physics data
struct GPUPhysicsData {
    glm::vec4 position;        // xyz = position, w = inverse mass
    glm::vec4 rotation;        // quaternion
    glm::vec4 linearVelocity;  // xyz = velocity, w = restitution
    glm::vec4 angularVelocity; // xyz = angular velocity, w = friction
    glm::vec4 force;           // xyz = force, w = is kinematic (0 or 1)
    glm::vec4 torque;          // xyz = torque, w = use gravity (0 or 1)
    glm::vec4 colliderData;    // type-specific data (e.g., radius for spheres)
    glm::vec4 colliderData2;   // additional collider data (e.g., box half extents)
};

// Structure for GPU collision data
struct GPUCollisionData {
    uint32_t bodyA;
    uint32_t bodyB;
    glm::vec4 contactNormal;   // xyz = normal, w = penetration depth
    glm::vec4 contactPoint;    // xyz = contact point, w = unused
};

// Extended PhysicsSystem with Vulkan acceleration
class PhysicsSystem {
public:
    // ... existing methods ...

    // Enable/disable GPU acceleration
    void SetGPUAccelerationEnabled(bool enabled) { m_GPUAccelerationEnabled = enabled; }
    bool IsGPUAccelerationEnabled() const { return m_GPUAccelerationEnabled; }

    // Set the maximum number of objects that can be simulated on the GPU
    void SetMaxGPUObjects(uint32_t maxObjects);

private:
    // ... existing members ...

    // GPU acceleration
    bool m_GPUAccelerationEnabled = false;
    uint32_t m_MaxGPUObjects = 1024;
    uint32_t m_MaxGPUCollisions = 4096;

    // Vulkan resources for physics simulation
    struct VulkanResources {
        // Shader modules
        vk::raii::ShaderModule integrateShaderModule = nullptr;
        vk::raii::ShaderModule broadPhaseShaderModule = nullptr;
        vk::raii::ShaderModule narrowPhaseShaderModule = nullptr;
        vk::raii::ShaderModule resolveShaderModule = nullptr;

        // Pipeline layouts and compute pipelines
        vk::raii::DescriptorSetLayout descriptorSetLayout = nullptr;
        vk::raii::PipelineLayout pipelineLayout = nullptr;
        vk::raii::Pipeline integratePipeline = nullptr;
        vk::raii::Pipeline broadPhasePipeline = nullptr;
        vk::raii::Pipeline narrowPhasePipeline = nullptr;
        vk::raii::Pipeline resolvePipeline = nullptr;

        // Descriptor pool and sets
        vk::raii::DescriptorPool descriptorPool = nullptr;
        std::vector descriptorSets;

        // Buffers for physics data
        vk::raii::Buffer physicsBuffer = nullptr;
        vk::raii::DeviceMemory physicsBufferMemory = nullptr;
        vk::raii::Buffer collisionBuffer = nullptr;
        vk::raii::DeviceMemory collisionBufferMemory = nullptr;
        vk::raii::Buffer pairBuffer = nullptr;
        vk::raii::DeviceMemory pairBufferMemory = nullptr;
        vk::raii::Buffer counterBuffer = nullptr;
        vk::raii::DeviceMemory counterBufferMemory = nullptr;

        // Command buffer for compute operations
        vk::raii::CommandPool commandPool = nullptr;
        vk::raii::CommandBuffer commandBuffer = nullptr;
    };

    VulkanResources m_VulkanResources;

    // Initialize Vulkan resources for physics simulation
    void InitializeVulkanResources();
    void CleanupVulkanResources();

    // Update physics data on the GPU
    void UpdateGPUPhysicsData();

    // Read back physics data from the GPU
    void ReadbackGPUPhysicsData();

    // Perform GPU-accelerated physics simulation
    void SimulatePhysicsOnGPU(float deltaTime);
};

} // namespace Physics
} // namespace Engine

Now, let’s implement the Vulkan-based physics simulation:

// Physics.cpp (implementation)

void PhysicsSystem::InitializeVulkanResources() {
    // Get Vulkan device from the engine
    auto& device = m_Engine.GetVulkanDevice();

    // Create compute shader modules
    auto integrateShaderCode = LoadShaderFile("shaders/physics_integrate.comp.spv");
    vk::ShaderModuleCreateInfo integrateShaderModuleCreateInfo({}, integrateShaderCode.size() * sizeof(uint32_t),
                                                             reinterpret_cast(integrateShaderCode.data()));
    m_VulkanResources.integrateShaderModule = vk::raii::ShaderModule(device, integrateShaderModuleCreateInfo);

    auto broadPhaseShaderCode = LoadShaderFile("shaders/physics_broad_phase.comp.spv");
    vk::ShaderModuleCreateInfo broadPhaseShaderModuleCreateInfo({}, broadPhaseShaderCode.size() * sizeof(uint32_t),
                                                              reinterpret_cast(broadPhaseShaderCode.data()));
    m_VulkanResources.broadPhaseShaderModule = vk::raii::ShaderModule(device, broadPhaseShaderModuleCreateInfo);

    auto narrowPhaseShaderCode = LoadShaderFile("shaders/physics_narrow_phase.comp.spv");
    vk::ShaderModuleCreateInfo narrowPhaseShaderModuleCreateInfo({}, narrowPhaseShaderCode.size() * sizeof(uint32_t),
                                                               reinterpret_cast(narrowPhaseShaderCode.data()));
    m_VulkanResources.narrowPhaseShaderModule = vk::raii::ShaderModule(device, narrowPhaseShaderModuleCreateInfo);

    auto resolveShaderCode = LoadShaderFile("shaders/physics_resolve.comp.spv");
    vk::ShaderModuleCreateInfo resolveShaderModuleCreateInfo({}, resolveShaderCode.size() * sizeof(uint32_t),
                                                           reinterpret_cast(resolveShaderCode.data()));
    m_VulkanResources.resolveShaderModule = vk::raii::ShaderModule(device, resolveShaderModuleCreateInfo);

    // Create descriptor set layout
    std::array bindings = {
        // Physics data buffer
        vk::DescriptorSetLayoutBinding(0, vk::DescriptorType::eStorageBuffer, 1,
                                      vk::ShaderStageFlagBits::eCompute),
        // Collision data buffer
        vk::DescriptorSetLayoutBinding(1, vk::DescriptorType::eStorageBuffer, 1,
                                      vk::ShaderStageFlagBits::eCompute),
        // Pair buffer (for broad phase)
        vk::DescriptorSetLayoutBinding(2, vk::DescriptorType::eStorageBuffer, 1,
                                      vk::ShaderStageFlagBits::eCompute),
        // Counter buffer
        vk::DescriptorSetLayoutBinding(3, vk::DescriptorType::eStorageBuffer, 1,
                                      vk::ShaderStageFlagBits::eCompute)
    };

    vk::DescriptorSetLayoutCreateInfo descriptorSetLayoutCreateInfo({}, bindings);
    m_VulkanResources.descriptorSetLayout = vk::raii::DescriptorSetLayout(device, descriptorSetLayoutCreateInfo);

    // Create pipeline layout
    vk::PipelineLayoutCreateInfo pipelineLayoutCreateInfo({}, *m_VulkanResources.descriptorSetLayout);
    m_VulkanResources.pipelineLayout = vk::raii::PipelineLayout(device, pipelineLayoutCreateInfo);

    // Create compute pipelines
    vk::PipelineShaderStageCreateInfo integrateShaderStageCreateInfo({}, vk::ShaderStageFlagBits::eCompute,
                                                                   *m_VulkanResources.integrateShaderModule, "main");
    vk::ComputePipelineCreateInfo integrateComputePipelineCreateInfo({}, integrateShaderStageCreateInfo,
                                                                   *m_VulkanResources.pipelineLayout);
    m_VulkanResources.integratePipeline = vk::raii::Pipeline(device, nullptr, integrateComputePipelineCreateInfo);

    vk::PipelineShaderStageCreateInfo broadPhaseShaderStageCreateInfo({}, vk::ShaderStageFlagBits::eCompute,
                                                                    *m_VulkanResources.broadPhaseShaderModule, "main");
    vk::ComputePipelineCreateInfo broadPhaseComputePipelineCreateInfo({}, broadPhaseShaderStageCreateInfo,
                                                                    *m_VulkanResources.pipelineLayout);
    m_VulkanResources.broadPhasePipeline = vk::raii::Pipeline(device, nullptr, broadPhaseComputePipelineCreateInfo);

    vk::PipelineShaderStageCreateInfo narrowPhaseShaderStageCreateInfo({}, vk::ShaderStageFlagBits::eCompute,
                                                                     *m_VulkanResources.narrowPhaseShaderModule, "main");
    vk::ComputePipelineCreateInfo narrowPhaseComputePipelineCreateInfo({}, narrowPhaseShaderStageCreateInfo,
                                                                     *m_VulkanResources.pipelineLayout);
    m_VulkanResources.narrowPhasePipeline = vk::raii::Pipeline(device, nullptr, narrowPhaseComputePipelineCreateInfo);

    vk::PipelineShaderStageCreateInfo resolveShaderStageCreateInfo({}, vk::ShaderStageFlagBits::eCompute,
                                                                 *m_VulkanResources.resolveShaderModule, "main");
    vk::ComputePipelineCreateInfo resolveComputePipelineCreateInfo({}, resolveShaderStageCreateInfo,
                                                                 *m_VulkanResources.pipelineLayout);
    m_VulkanResources.resolvePipeline = vk::raii::Pipeline(device, nullptr, resolveComputePipelineCreateInfo);

    // Create descriptor pool
    std::array poolSizes = {
        vk::DescriptorPoolSize(vk::DescriptorType::eStorageBuffer, 4)
    };
    vk::DescriptorPoolCreateInfo descriptorPoolCreateInfo({}, 1, poolSizes);
    m_VulkanResources.descriptorPool = vk::raii::DescriptorPool(device, descriptorPoolCreateInfo);

    // Allocate descriptor sets
    vk::DescriptorSetAllocateInfo descriptorSetAllocateInfo(*m_VulkanResources.descriptorPool,
                                                           1, &*m_VulkanResources.descriptorSetLayout);
    m_VulkanResources.descriptorSets = vk::raii::DescriptorSets(device, descriptorSetAllocateInfo);

    // Create buffers for physics data
    CreateBuffer(device, sizeof(GPUPhysicsData) * m_MaxGPUObjects,
                vk::BufferUsageFlagBits::eStorageBuffer,
                m_VulkanResources.physicsBuffer, m_VulkanResources.physicsBufferMemory);

    CreateBuffer(device, sizeof(GPUCollisionData) * m_MaxGPUCollisions,
                vk::BufferUsageFlagBits::eStorageBuffer,
                m_VulkanResources.collisionBuffer, m_VulkanResources.collisionBufferMemory);

    CreateBuffer(device, sizeof(uint32_t) * 2 * m_MaxGPUCollisions,
                vk::BufferUsageFlagBits::eStorageBuffer,
                m_VulkanResources.pairBuffer, m_VulkanResources.pairBufferMemory);

    CreateBuffer(device, sizeof(uint32_t) * 2,
                vk::BufferUsageFlagBits::eStorageBuffer,
                m_VulkanResources.counterBuffer, m_VulkanResources.counterBufferMemory);

    // Update descriptor sets
    std::array bufferInfos = {
        vk::DescriptorBufferInfo(*m_VulkanResources.physicsBuffer, 0, VK_WHOLE_SIZE),
        vk::DescriptorBufferInfo(*m_VulkanResources.collisionBuffer, 0, VK_WHOLE_SIZE),
        vk::DescriptorBufferInfo(*m_VulkanResources.pairBuffer, 0, VK_WHOLE_SIZE),
        vk::DescriptorBufferInfo(*m_VulkanResources.counterBuffer, 0, VK_WHOLE_SIZE)
    };

    std::array descriptorWrites = {
        vk::WriteDescriptorSet(*m_VulkanResources.descriptorSets[0], 0, 0, 1,
                              vk::DescriptorType::eStorageBuffer, nullptr, &bufferInfos[0]),
        vk::WriteDescriptorSet(*m_VulkanResources.descriptorSets[0], 1, 0, 1,
                              vk::DescriptorType::eStorageBuffer, nullptr, &bufferInfos[1]),
        vk::WriteDescriptorSet(*m_VulkanResources.descriptorSets[0], 2, 0, 1,
                              vk::DescriptorType::eStorageBuffer, nullptr, &bufferInfos[2]),
        vk::WriteDescriptorSet(*m_VulkanResources.descriptorSets[0], 3, 0, 1,
                              vk::DescriptorType::eStorageBuffer, nullptr, &bufferInfos[3])
    };

    device.updateDescriptorSets(descriptorWrites, {});

    // Create command pool and command buffer
    vk::CommandPoolCreateInfo commandPoolCreateInfo({}, m_Engine.GetVulkanQueueFamilyIndex());
    m_VulkanResources.commandPool = vk::raii::CommandPool(device, commandPoolCreateInfo);

    vk::CommandBufferAllocateInfo commandBufferAllocateInfo(*m_VulkanResources.commandPool,
                                                           vk::CommandBufferLevel::ePrimary, 1);
    auto commandBuffers = vk::raii::CommandBuffers(device, commandBufferAllocateInfo);
    m_VulkanResources.commandBuffer = std::move(commandBuffers[0]);

    // Initialize counter buffer
    uint32_t initialCounters[2] = { 0, 0 }; // [0] = pair count, [1] = collision count
    void* data;
    vkMapMemory(device, *m_VulkanResources.counterBufferMemory, 0, sizeof(initialCounters), 0, &data);
    memcpy(data, initialCounters, sizeof(initialCounters));
    vkUnmapMemory(device, *m_VulkanResources.counterBufferMemory);
}

void PhysicsSystem::UpdateGPUPhysicsData() {
    auto& device = m_Engine.GetVulkanDevice();

    // Map the physics buffer
    void* data;
    vkMapMemory(device, *m_VulkanResources.physicsBufferMemory, 0,
               sizeof(GPUPhysicsData) * m_RigidBodies.size(), 0, &data);

    // Copy physics data to the buffer
    GPUPhysicsData* gpuData = static_cast(data);
    for (size_t i = 0; i GetPosition(), body->GetInverseMass());
        gpuData[i].rotation = glm::vec4(body->GetRotation().x, body->GetRotation().y,
                                       body->GetRotation().z, body->GetRotation().w);
        gpuData[i].linearVelocity = glm::vec4(body->GetLinearVelocity(), body->GetRestitution());
        gpuData[i].angularVelocity = glm::vec4(body->GetAngularVelocity(), body->GetFriction());
        gpuData[i].force = glm::vec4(body->m_AccumulatedForce, body->IsKinematic() ? 1.0f : 0.0f);
        gpuData[i].torque = glm::vec4(body->m_AccumulatedTorque, body->IsGravityEnabled() ? 1.0f : 0.0f);

        // Set collider data based on collider type
        auto collider = body->GetCollider();
        if (collider) {
            switch (collider->GetType()) {
                case ColliderType::Sphere: {
                    auto sphereCollider = std::static_pointer_cast(collider);
                    gpuData[i].colliderData = glm::vec4(sphereCollider->GetRadius(), 0.0f, 0.0f,
                                                      static_cast(ColliderType::Sphere));
                    gpuData[i].colliderData2 = glm::vec4(collider->GetOffset(), 0.0f);
                    break;
                }
                case ColliderType::Box: {
                    auto boxCollider = std::static_pointer_cast(collider);
                    gpuData[i].colliderData = glm::vec4(boxCollider->GetHalfExtents(),
                                                      static_cast(ColliderType::Box));
                    gpuData[i].colliderData2 = glm::vec4(collider->GetOffset(), 0.0f);
                    break;
                }
                default:
                    // Unsupported collider type
                    gpuData[i].colliderData = glm::vec4(0.0f, 0.0f, 0.0f, -1.0f);
                    gpuData[i].colliderData2 = glm::vec4(0.0f);
                    break;
            }
        } else {
            // No collider
            gpuData[i].colliderData = glm::vec4(0.0f, 0.0f, 0.0f, -1.0f);
            gpuData[i].colliderData2 = glm::vec4(0.0f);
        }
    }

    vkUnmapMemory(device, *m_VulkanResources.physicsBufferMemory);

    // Reset counters
    uint32_t initialCounters[2] = { 0, 0 }; // [0] = pair count, [1] = collision count
    vkMapMemory(device, *m_VulkanResources.counterBufferMemory, 0, sizeof(initialCounters), 0, &data);
    memcpy(data, initialCounters, sizeof(initialCounters));
    vkUnmapMemory(device, *m_VulkanResources.counterBufferMemory);
}

void PhysicsSystem::ReadbackGPUPhysicsData() {
    auto& device = m_Engine.GetVulkanDevice();

    // Map the physics buffer
    void* data;
    vkMapMemory(device, *m_VulkanResources.physicsBufferMemory, 0,
               sizeof(GPUPhysicsData) * m_RigidBodies.size(), 0, &data);

    // Copy physics data from the buffer
    GPUPhysicsData* gpuData = static_cast(data);
    for (size_t i = 0; i IsKinematic()) {
            continue;
        }

        body->SetPosition(glm::vec3(gpuData[i].position));
        body->SetRotation(glm::quat(gpuData[i].rotation.w, gpuData[i].rotation.x,
                                   gpuData[i].rotation.y, gpuData[i].rotation.z));
        body->SetLinearVelocity(glm::vec3(gpuData[i].linearVelocity));
        body->SetAngularVelocity(glm::vec3(gpuData[i].angularVelocity));
    }

    vkUnmapMemory(device, *m_VulkanResources.physicsBufferMemory);
}

void PhysicsSystem::SimulatePhysicsOnGPU(float deltaTime) {
    auto& device = m_Engine.GetVulkanDevice();
    auto& queue = m_Engine.GetVulkanComputeQueue();

    // Update physics data on the GPU
    UpdateGPUPhysicsData();

    // Record command buffer
    vk::CommandBufferBeginInfo beginInfo(vk::CommandBufferUsageFlagBits::eOneTimeSubmit);
    m_VulkanResources.commandBuffer.begin(beginInfo);

    // Bind descriptor set
    m_VulkanResources.commandBuffer.bindDescriptorSets(vk::PipelineBindPoint::eCompute,
                                                     *m_VulkanResources.pipelineLayout, 0,
                                                     *m_VulkanResources.descriptorSets[0], {});

    // Push constants for simulation parameters
    struct {
        float deltaTime;
        float gravity[3];
        uint32_t numBodies;
    } pushConstants;

    pushConstants.deltaTime = deltaTime;
    pushConstants.gravity[0] = m_Gravity.x;
    pushConstants.gravity[1] = m_Gravity.y;
    pushConstants.gravity[2] = m_Gravity.z;
    pushConstants.numBodies = static_cast(m_RigidBodies.size());

    m_VulkanResources.commandBuffer.pushConstants(*m_VulkanResources.pipelineLayout,
                                                vk::ShaderStageFlagBits::eCompute, 0,
                                                sizeof(pushConstants), &pushConstants);

    // Step 1: Integrate forces and velocities
    m_VulkanResources.commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute,
                                               *m_VulkanResources.integratePipeline);
    m_VulkanResources.commandBuffer.dispatch((pushConstants.numBodies + 63) / 64, 1, 1);

    // Memory barrier to ensure integration is complete before collision detection
    vk::MemoryBarrier memoryBarrier(vk::AccessFlagBits::eShaderWrite, vk::AccessFlagBits::eShaderRead);
    m_VulkanResources.commandBuffer.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                                                  vk::PipelineStageFlagBits::eComputeShader,
                                                  {}, memoryBarrier, {}, {});

    // Step 2: Broad-phase collision detection
    m_VulkanResources.commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute,
                                               *m_VulkanResources.broadPhasePipeline);
    // Each thread checks one pair of objects
    uint32_t numPairs = (pushConstants.numBodies * (pushConstants.numBodies - 1)) / 2;
    m_VulkanResources.commandBuffer.dispatch((numPairs + 63) / 64, 1, 1);

    // Memory barrier to ensure broad phase is complete before narrow phase
    m_VulkanResources.commandBuffer.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                                                  vk::PipelineStageFlagBits::eComputeShader,
                                                  {}, memoryBarrier, {}, {});

    // Step 3: Narrow-phase collision detection
    m_VulkanResources.commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute,
                                               *m_VulkanResources.narrowPhasePipeline);
    // We don't know how many pairs were generated, so we use a conservative estimate
    m_VulkanResources.commandBuffer.dispatch((m_MaxGPUCollisions + 63) / 64, 1, 1);

    // Memory barrier to ensure narrow phase is complete before resolution
    m_VulkanResources.commandBuffer.pipelineBarrier(vk::PipelineStageFlagBits::eComputeShader,
                                                  vk::PipelineStageFlagBits::eComputeShader,
                                                  {}, memoryBarrier, {}, {});

    // Step 4: Collision resolution
    m_VulkanResources.commandBuffer.bindPipeline(vk::PipelineBindPoint::eCompute,
                                               *m_VulkanResources.resolvePipeline);
    // We don't know how many collisions were detected, so we use a conservative estimate
    m_VulkanResources.commandBuffer.dispatch((m_MaxGPUCollisions + 63) / 64, 1, 1);

    m_VulkanResources.commandBuffer.end();

    // Submit command buffer
    vk::SubmitInfo submitInfo({}, {}, *m_VulkanResources.commandBuffer);
    queue.submit(submitInfo, nullptr);
    queue.waitIdle();

    // Read back physics data from the GPU
    ReadbackGPUPhysicsData();
}

void PhysicsSystem::Update(float deltaTime) {
    if (m_GPUAccelerationEnabled && m_RigidBodies.size() 

Now, let’s implement the compute shaders for our GPU-accelerated physics system:

// physics_integrate.comp
#version 450

layout(local_size_x = 64, local_size_y = 1, local_size_z = 1) in;

// Push constants
layout(push_constant) uniform PushConstants {
    float deltaTime;
    vec3 gravity;
    uint numBodies;
} pushConstants;

// Physics data
struct PhysicsData {
    vec4 position;        // xyz = position, w = inverse mass
    vec4 rotation;        // quaternion
    vec4 linearVelocity;  // xyz = velocity, w = restitution
    vec4 angularVelocity; // xyz = angular velocity, w = friction
    vec4 force;           // xyz = force, w = is kinematic (0 or 1)
    vec4 torque;          // xyz = torque, w = use gravity (0 or 1)
    vec4 colliderData;    // type-specific data (e.g., radius for spheres)
    vec4 colliderData2;   // additional collider data (e.g., box half extents)
};

layout(std430, binding = 0) buffer PhysicsBuffer {
    PhysicsData bodies[];
} physicsBuffer;

// Quaternion multiplication
vec4 quatMul(vec4 q1, vec4 q2) {
    return vec4(
        q1.w * q2.x + q1.x * q2.w + q1.y * q2.z - q1.z * q2.y,
        q1.w * q2.y - q1.x * q2.z + q1.y * q2.w + q1.z * q2.x,
        q1.w * q2.z + q1.x * q2.y - q1.y * q2.x + q1.z * q2.w,
        q1.w * q2.w - q1.x * q2.x - q1.y * q2.y - q1.z * q2.z
    );
}

// Quaternion normalization
vec4 quatNormalize(vec4 q) {
    float len = length(q);
    if (len > 0.0001) {
        return q / len;
    }
    return vec4(0, 0, 0, 1);
}

void main() {
    uint gID = gl_GlobalInvocationID.x;

    // Check if this invocation is within the number of bodies
    if (gID >= pushConstants.numBodies) {
        return;
    }

    // Get physics data for this body
    PhysicsData body = physicsBuffer.bodies[gID];

    // Skip kinematic bodies
    if (body.force.w > 0.5) {
        return;
    }

    // Apply gravity if enabled
    if (body.torque.w > 0.5) {
        body.force.xyz += pushConstants.gravity / body.position.w;
    }

    // Integrate forces
    body.linearVelocity.xyz += body.force.xyz * body.position.w * pushConstants.deltaTime;
    body.angularVelocity.xyz += body.torque.xyz * pushConstants.deltaTime; // Simplified, should use inertia tensor

    // Apply damping
    const float linearDamping = 0.01;
    const float angularDamping = 0.01;
    body.linearVelocity.xyz *= (1.0 - linearDamping);
    body.angularVelocity.xyz *= (1.0 - angularDamping);

    // Integrate velocities
    body.position.xyz += body.linearVelocity.xyz * pushConstants.deltaTime;

    // Update rotation
    vec4 angularVelocityQuat = vec4(body.angularVelocity.xyz * 0.5, 0.0);
    vec4 rotationDelta = quatMul(angularVelocityQuat, body.rotation);
    body.rotation = quatNormalize(body.rotation + rotationDelta * pushConstants.deltaTime);

    // Write updated data back to buffer
    physicsBuffer.bodies[gID] = body;
}

// physics_broad_phase.comp
#version 450

layout(local_size_x = 64, local_size_y = 1, local_size_z = 1) in;

// Push constants
layout(push_constant) uniform PushConstants {
    float deltaTime;
    vec3 gravity;
    uint numBodies;
} pushConstants;

// Physics data
struct PhysicsData {
    vec4 position;        // xyz = position, w = inverse mass
    vec4 rotation;        // quaternion
    vec4 linearVelocity;  // xyz = velocity, w = restitution
    vec4 angularVelocity; // xyz = angular velocity, w = friction
    vec4 force;           // xyz = force, w = is kinematic (0 or 1)
    vec4 torque;          // xyz = torque, w = use gravity (0 or 1)
    vec4 colliderData;    // type-specific data (e.g., radius for spheres)
    vec4 colliderData2;   // additional collider data (e.g., box half extents)
};

layout(std430, binding = 0) buffer PhysicsBuffer {
    PhysicsData bodies[];
} physicsBuffer;

// Pair buffer for potential collisions
layout(std430, binding = 2) buffer PairBuffer {
    uvec2 pairs[];
} pairBuffer;

// Counter buffer
layout(std430, binding = 3) buffer CounterBuffer {
    uint pairCount;
    uint collisionCount;
} counterBuffer;

// Compute AABB for a body
void computeAABB(PhysicsData body, out vec3 min, out vec3 max) {
    // Default to a small AABB
    min = body.position.xyz - vec3(0.1);
    max = body.position.xyz + vec3(0.1);

    // Check collider type
    int colliderType = int(body.colliderData.w);

    if (colliderType == 0) { // Sphere
        float radius = body.colliderData.x;
        vec3 center = body.position.xyz + body.colliderData2.xyz;
        min = center - vec3(radius);
        max = center + vec3(radius);
    }
    else if (colliderType == 1) { // Box
        vec3 halfExtents = body.colliderData.xyz;
        vec3 center = body.position.xyz + body.colliderData2.xyz;
        // This is simplified - should account for rotation
        min = center - halfExtents;
        max = center + halfExtents;
    }
}

bool aabbOverlap(vec3 minA, vec3 maxA, vec3 minB, vec3 maxB) {
    return all(lessThan(minA, maxB)) && all(lessThan(minB, maxA));
}

void main() {
    uint gID = gl_GlobalInvocationID.x;

    // Calculate which pair of bodies this thread should check
    uint numBodies = pushConstants.numBodies;
    uint numPairs = (numBodies * (numBodies - 1)) / 2;

    if (gID >= numPairs) {
        return;
    }

    // Convert linear index to pair indices (i, j) where i  i
    j += i + 1;

    // Get physics data for both bodies
    PhysicsData bodyA = physicsBuffer.bodies[i];
    PhysicsData bodyB = physicsBuffer.bodies[j];

    // Skip if both bodies are kinematic
    if (bodyA.force.w > 0.5 && bodyB.force.w > 0.5) {
        return;
    }

    // Skip if either body doesn't have a collider
    if (bodyA.colliderData.w 

The narrow-phase and resolve shaders would follow a similar pattern, implementing the detailed collision detection and resolution algorithms.

When implementing GPU-accelerated physics with Vulkan, consider these performance optimizations:

**Batch Processing**: Process multiple physics steps in a single dispatch to amortize the overhead of command submission.

**Memory Transfers**: Minimize transfers between CPU and GPU memory by keeping physics data on the GPU when possible.

**Spatial Partitioning**: Implement grid or tree-based spatial partitioning to reduce the number of potential collision pairs.

**Workgroup Size**: Tune the workgroup size based on your target hardware for optimal performance.

**Memory Layout**: Organize physics data for optimal cache coherency on the GPU.

To integrate the GPU-accelerated physics into our engine, we need to modify the `PhysicsSystem::Initialize` method:

void PhysicsSystem::Initialize() {
    // Initialize basic physics system
    // ...

    // Initialize Vulkan resources for GPU-accelerated physics
    if (m_Engine.IsVulkanInitialized()) {
        InitializeVulkanResources();
        m_GPUAccelerationEnabled = true;
    }
}

void PhysicsSystem::Shutdown() {
    // Cleanup Vulkan resources
    if (m_Engine.IsVulkanInitialized()) {
        CleanupVulkanResources();
    }

    // Shutdown basic physics system
    // ...
}

By implementing physics simulation with Vulkan compute shaders, we gain several advantages:

**Scalability**: The GPU can simulate thousands or even millions of objects in parallel.

**Performance**: GPU-accelerated physics can be orders of magnitude faster than CPU-based solutions for large-scale simulations.

**CPU Offloading**: Physics processing no longer competes with game logic for CPU resources.

**Advanced Simulations**: The GPU’s computational power enables more complex physics simulations like fluid dynamics or cloth.

While Vulkan-based physics offers many advantages, there are some limitations to consider:

**Complexity**: Implementing and debugging GPU-based physics is more complex than CPU-based solutions.

**Precision**: GPUs typically use single-precision floating-point, which may lead to numerical stability issues in some simulations.

**Platform Support**: Not all platforms support Vulkan, so you may need fallback CPU implementations.

**Synchronization**: Keeping CPU and GPU physics data in sync can be challenging and may introduce latency.

Several modern game engines and physics middleware solutions leverage GPU acceleration for physics simulations:

**NVIDIA PhysX**: Supports GPU acceleration for certain physics calculations.

**Bullet Physics**: Has experimental GPU acceleration using compute shaders.

**Flex**: NVIDIA’s particle-based physics solver designed specifically for GPU acceleration.

**Custom Solutions**: AAA game studios often implement custom GPU-accelerated physics for their titles.

By implementing Vulkan-based physics in our engine, we’re following industry best practices for high-performance physics in modern games.

In this chapter, we’ve explored how Vulkan compute shaders can be used to accelerate both audio and physics processing in a game engine. By leveraging the GPU’s massive parallel processing capabilities, we can create more immersive and dynamic game worlds with realistic audio and physics simulations.

The techniques we’ve covered demonstrate the versatility of Vulkan beyond traditional graphics rendering. As you continue to develop your engine, consider other areas where GPU acceleration might provide benefits, such as AI pathfinding, procedural generation, or particle systems.

[Previous: Physics Basics](04_physics_basics.html) | [Next: Conclusion](06_conclusion.html)
