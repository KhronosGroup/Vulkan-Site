# Compute Shaders

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/compute_shaders.html

## Table of Contents

- [Coming from Vulkan Graphics](#_coming_from_vulkan_graphics)
- [Coming_from_Vulkan_Graphics](#_coming_from_vulkan_graphics)
- [SPIR-V Terminology](#_spir_v_terminology)
- [Workgroup Size](#_workgroup_size)
- [Local and Global Workgroups](#_local_and_global_workgroups)
- [Local_and_Global_Workgroups](#_local_and_global_workgroups)
- [Dispatching size from a buffer](#_dispatching_size_from_a_buffer)
- [Dispatching_size_from_a_buffer](#_dispatching_size_from_a_buffer)
- [Shared memory](#_shared_memory)
- [Shared Memory Race Conditions](#_shared_memory_race_conditions)
- [Shared_Memory_Race_Conditions](#_shared_memory_race_conditions)
- [Detecting shared memory data races](#_detecting_shared_memory_data_races)
- [Detecting_shared_memory_data_races](#_detecting_shared_memory_data_races)
- [Explicit Layout of shared memory](#_explicit_layout_of_shared_memory)
- [Explicit_Layout_of_shared_memory](#_explicit_layout_of_shared_memory)
- [Finding the invocation in your shader](#_finding_the_invocation_in_your_shader)
- [Finding_the_invocation_in_your_shader](#_finding_the_invocation_in_your_shader)

## Content

This chapter is **not** a "how to use compute shader" article, there are plenty of resources online around GPGPU and compute.

What this chapter is for is all the "Vulkan-ism", terms, etc that are associated with compute shaders.

There is also a [Decoder Ring](decoder_ring.html) created to help people transition from other APIs that use different terminology.

|  | If you want to play around with a simple compute example, suggest taking a look at the [vk-bootstrap sample](https://github.com/charles-lunarg/vk-bootstrap/blob/main/example/simple_compute.cpp). |
| --- | --- |

For those who are more familiar with graphics in Vulkan, compute will be a simple transition. Basically everything is the same except:

* 
Call `vkCmdDispatch` instead of `vkCmdDraw`

* 
Use `vkCreateComputePipelines` instead of `vkCreateGraphicsPipelines`

* 
Make sure your `VkQueue` [supports](queues.html) `VK_QUEUE_COMPUTE_BIT`

* 
When binding descriptors and pipelines to your command buffer, make sure to use `VK_PIPELINE_BIND_POINT_COMPUTE`

The smallest unit of work that is done is called an `invocation`. It is a "thread" or "lane" of work.

Multiple `Invocations` are organized into `subgroups`, where `invocations` within a `subgroup` can synchronize and share data with each other efficiently. (See more in the [subgroup chapter](subgroups.html))

Next we have `workgroups` which is the smallest unit of work that an application can define. A `workgroup` is a collection of `invocations` that execute the same shader.

|  | While slightly annoying, Vulkan spec uses `WorkGroup` while the SPIR-V spec spells it as `Workgroup`. It has no significant meaning, other than a potential typo when going between the two. |
| --- | --- |

Setting the `workgroup` size can be done in 3 ways in SPIR-V:

Using the `WorkgroupSize` built-in ([example](https://godbolt.org/z/ees83eT7x))

Using the `LocalSize` execution mode ([example](https://godbolt.org/z/3zn1Preb8))

Using the `LocalSizeId` execution mode ([example](https://godbolt.org/z/dP7daqTas))

|  | Examples how to do this in [glsl](https://godbolt.org/z/cP8esohKz), [hlsl](https://godbolt.org/z/6W41K4bbz), and [slang](https://godbolt.org/z/94erx7eTT) |
| --- | --- |

A few important things to note:

* 
The `WorkgroupSize` decoration will take precedence over any `LocalSize` or `LocalSizeId` in the same module.

* 
`LocalSizeId` was added in the extension `VK_KHR_maintenance4` (made core in Vulkan 1.3) to allow the ability to use specialization constants to set the size.

* 
There is a `maxComputeWorkGroupSize` limit how large the `X`, `Y`, and `Z` size can each be in each dimension. Most implementations [support around 1024 for each dimension](https://vulkan.gpuinfo.org/displaydevicelimit.php?name=maxComputeWorkGroupSize[0]&platform=all).

* 
There is a `maxComputeWorkGroupInvocations` limit how large the product of `X` * `Y` * `Z` can be. Most implementations [support around 1024](https://vulkan.gpuinfo.org/displaydevicelimit.php?name=maxComputeWorkGroupInvocations&platform=all).

When `vkCmdDispatch` is called, it sets the number of workgroups to dispatch. This produces a `global workgroup` space that the GPU will work on. Each single workgroup is a `local workgroup`. An `invocation` within a `local workgroup` can share data with other members of the `local workgroup` through shared variables as well as issue memory and control flow barriers to synchronize with other members of the `local workgroup`.

|  | There is a `maxComputeWorkGroupCount` limit [some hardware](https://vulkan.gpuinfo.org/displaydevicelimit.php?name=maxComputeWorkGroupCount[0]&platform=all) supports only 64k, but newer hardware can basically be unlimited here. |
| --- | --- |

The `vkCmdDispatchIndirect` (and newer `vkCmdDispatchIndirect2KHR`) allow the size to be controlled from a buffer. This means the GPU can set the number of workgroups to dispatch.

// or any other draw/dispath that will update the memory on the GPU
vkCmdDispatch();

vkCmdPipelineBarrier(
    VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT, // src stage
    VK_ACCESS_SHADER_WRITE_BIT,           // src access
    VK_PIPELINE_STAGE_DRAW_INDIRECT_BIT,  // dst stage
    VK_ACCESS_INDIRECT_COMMAND_READ_BIT,  // dst access
)

// Reads VkDispatchIndirectCommand in buffer to set the number of local workgroups
vkCmdDispatchIndirect(my_buffer);

When inside a single `local workgroup` "shared memory" can be used. In SPIR-V this is referenced with the `Workgroup` storage class.

Shared memory is essentially the "L1 cache you can control" in your compute shader and an important part of any performant shader.

There is a `maxComputeSharedMemorySize` limit ([mainly around 32k bytes](https://vulkan.gpuinfo.org/displaydevicelimit.php?name=maxComputeSharedMemorySize&platform=all)) that needs to be accounted for.

It is very easy to have race conditions when using shared memory.

The classic example is when multiple invocations initialize something to the same value.

shared uint my_var;
void main() {
    // All the invocations in the workgroup are going to try to write to the same memory.
    // RACE CONDITION
    my_var = 0;
}

If you are asking "why?", the "technically correct" answer is "because the [memory model](https://docs.vulkan.org/spec/latest/appendices/memorymodel.html) says so".

When you do a weak store to a memory location, that invocation "owns" that memory location until synchronization occurs. The compiler **can** use that information and choose to reuse that location as temporary storage for another value.

Luckily the fix is simple, make sure to use atomics

shared uint my_var;
void main() {
    atomicStore(my_var, 0u, gl_ScopeWorkgroup, 0, 0);
}

Another option is to use a `OpControlBarrier` with `Workgroup` scope ([see online](https://godbolt.org/z/WcsvjYfPx)).

layout(local_size_x = 32) in; // 32x1x1 workgroup
shared uint my_var[32]; // one slot for each invocation

void main() {
    my_var[gl_LocalInvocationIndex] = 0;
    barrier(); // will generate an OpControlBarrier for you
    uint x = my_var[gl_LocalInvocationIndex ^ 1];
}

Luckily this problem can be caught automatically using the [GPU-AV](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/docs/gpu_validation.md) feature in Vulkan Validation Layers!

As of March 2026 (TODO - Add SDK version when released in May), GPU-AV will attempt to detect these races for you. There are a [few limitations](https://github.com/KhronosGroup/Vulkan-ValidationLayers/blob/main/layers/gpuav/shaders/instrumentation/shared_memory_data_race.comp#L47), but highly suggest trying out if having strange issues around your shared memory accesses.

The [VK_KHR_workgroup_memory_explicit_layout](extensions/shader_features.html#VK_KHR_workgroup_memory_explicit_layout) extension was added to allow [explicit layout](https://github.com/KhronosGroup/SPIRV-Guide/blob/main/chapters/explicit_layout.md) of shared memory.

There are many SPIR-V built-in values that can be used to find the invocation in your shader.

The following built-ins are well defined in the [builtin chapter](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-builtin-variables) of the Vulkan spec.

* 
`GlobalInvocationId`

* 
`LocalInvocationId`

* 
`LocalInvocationIndex`

* 
`NumSubgroups`

* 
`NumWorkgroups`

* 
`SubgroupId`

* 
`WorkgroupId`

For those who want a more "hands on" example, [the following GLSL](https://godbolt.org/z/qhPrE6o5b) demonstrates using most of these built-ins.
