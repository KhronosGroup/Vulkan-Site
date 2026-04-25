# VK_AMDX_shader_enqueue

## Metadata

- **Component**: features
- **Version**: latest
- **URL**: /features/latest/features/proposals/VK_AMDX_shader_enqueue.html

## Table of Contents

- [1. Problem Statement](#_problem_statement)
- [1._Problem_Statement](#_problem_statement)
- [2. Solution Space](#_solution_space)
- [2._Solution_Space](#_solution_space)
- [3. Proposal](#_proposal)
- [3.1. API Changes](#_api_changes)
- [3.1._API_Changes](#_api_changes)
- [3.1.1. Graph Pipelines](#_graph_pipelines)
- [3.1.1._Graph_Pipelines](#_graph_pipelines)
- [Graphics Pipeline State](#_graphics_pipeline_state)
- [Graphics_Pipeline_State](#_graphics_pipeline_state)
- [3.1.2. Scratch Memory](#_scratch_memory)
- [3.1.2._Scratch_Memory](#_scratch_memory)
- [3.1.3. Dispatch a graph](#_dispatch_a_graph)
- [3.1.3._Dispatch_a_graph](#_dispatch_a_graph)
- [3.1.4. Properties](#_properties)
- [3.1.5. Features](#_features)
- [3.2. SPIR-V Changes](#_spir_v_changes)
- [3.2._SPIR-V_Changes](#_spir_v_changes)
- [4. Issues](#_issues)
- [4.1. How does this extension interact with device groups?](#_how_does_this_extension_interact_with_device_groups)
- [4.1._How_does_this_extension_interact_with_device_groups?](#_how_does_this_extension_interact_with_device_groups)
- [4.2. What dynamic state should be allowed?](#_what_dynamic_state_should_be_allowed)
- [4.2._What_dynamic_state_should_be_allowed?](#_what_dynamic_state_should_be_allowed)

## Content

Table of Contents

[1. Problem Statement](#_problem_statement)
[2. Solution Space](#_solution_space)
[3. Proposal](#_proposal)

[3.1. API Changes](#_api_changes)
[3.2. SPIR-V Changes](#_spir_v_changes)

[4. Issues](#_issues)

[4.1. How does this extension interact with device groups?](#_how_does_this_extension_interact_with_device_groups)
[4.2. What dynamic state should be allowed?](#_what_dynamic_state_should_be_allowed)

This extension adds the ability for developers to enqueue mesh pipelines and compute shader workgroups from other compute shaders.

Applications are increasingly using more complex renderers, often incorporating multiple compute passes that classify, sort, or otherwise preprocess input data.
These passes may be used to determine how future work is performed on the GPU; but triggering that future GPU work requires either a round trip to the host, or going through buffer memory and using indirect commands.
Host round trips necessarily include more system bandwidth and latency as command buffers need to be built and transmitted back to the GPU.
Indirect commands work well in many cases, but they have little flexibility when it comes to determining what is actually dispatched; they must be enqueued ahead of time, synchronized with heavy API barriers, and execute with a single pre-recorded pipeline.

Whilst latency can be hidden and indirect commands can work in many cases where additional latency and bandwidth is not acceptable, recent engine developments such as Unreal 5’s Nanite technology explicitly require the flexibility of shader selection *and* low latency.
A desirable solution should be able to have the flexibility required for these systems, while keeping the execution loop firmly on the GPU.

Three main possibilities exist:

Extend indirect commands

VK_NV_device_generated_commands

Shader enqueue

More flexible indirect commands could feasibly allow things like shader selection, introduce more complex flow control, or include indirect state setting commands.
The main issue with these is that these always require parameters to be written through regular buffer memory, and that buffer memory has to be sized for each indirect command to handle the maximum number of possibilities.
As well as the large allocation size causing memory pressure, pushing all that data through buffer memory will reduce the bandwidth available for other operations.
All of this could cause bottlenecks elsewhere in the pipeline.
Hypothetically a new interface for better scheduling/memory management could be introduced, but that starts looking a lot like option 3.

Option 2 - implementing a cross-vendor equivalent of VK_NV_device_generated_commands would be a workable solution that adds both flexibility and avoids a CPU round trip.
The reason it has not enjoyed wider support is due to concerns about how the commands are generated - it uses a tokenised API which has to be processed by the GPU before it can be executed.
For existing GPUs this can mean doing things like running a single compute shader invocation to process each token stream into a runnable command buffer, adding both latency and bandwidth on the GPU.

Option 3 - OpenCL and CUDA have had some form of shader enqueue API for a while, where the focus has typically been primarily on enabling developers and on compute workloads.
From a user interface perspective these have had a decent amount of battle testing and is quite a popular and flexible interface.

This proposal is built around something like Option 3, but extended to be explicit and performant.

In order to facilitate dispatch of multiple shaders from the GPU, the implementation needs some information about how pipelines will be launched and synchronized.
This proposal introduces a new *execution graph pipeline* that defines execution paths between multiple shaders, and allows dynamic execution of different shaders.

VkResult vkCreateExecutionGraphPipelinesAMDX(
    VkDevice                                        device,
    VkPipelineCache                                 pipelineCache,
    uint32_t                                        createInfoCount,
    const VkExecutionGraphPipelineCreateInfoAMDX*   pCreateInfos,
    const VkAllocationCallbacks*                    pAllocator,
    VkPipeline*                                     pPipelines);

typedef struct VkExecutionGraphPipelineCreateInfoAMDX {
    VkStructureType                             sType;
    const void*                                 pNext;
    VkPipelineCreateFlags                       flags;
    uint32_t                                    stageCount;
    const VkPipelineShaderStageCreateInfo*      pStages;
    const VkPipelineLibraryCreateInfoKHR*       pLibraryInfo;
    VkPipelineLayout                            layout;
    VkPipeline                                  basePipelineHandle;
    int32_t                                     basePipelineIndex;
} VkExecutionGraphPipelineCreateInfoAMDX;

Shaders defined by `pStages` and any pipelines in `pLibraryInfo→pLibraries` define the possible nodes of the graph.
The linkage between nodes however is defined wholly in shader code, though may be overridden by specialization constants in many cases.

Shaders in `pStages` must be in the `GLCompute` execution model, and may have the **CoalescingAMDX** execution mode.

Pipelines in `pLibraries` can be compute pipelines, graphics pipelines, or other execution graph pipelines. Compute and graphics pipelines must be created with the `VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR` and `VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX` flag bits. Execution graph pipelines used as libraries must be created with the `VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR` flag bit.

VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX = 0x100000000ULL

Each shader in an execution graph is associated with a name and an index, which are used to identify the target shader when dispatching a payload.
The `VkPipelineShaderStageNodeCreateInfoAMDX` provides options for specifying how the shader is specified with regards to its entry point name and index, and can be chained to the [VkPipelineShaderStageCreateInfo](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#VkPipelineShaderStageCreateInfo) structure.

const uint32_t VK_SHADER_INDEX_UNUSED_AMDX = 0xFFFFFFFF;

typedef struct VkPipelineShaderStageNodeCreateInfoAMDX {
    VkStructureType                             sType;
    const void*                                 pNext;
    const char*                                 pName;
    uint32_t                                    index;
} VkPipelineShaderStageNodeCreateInfoAMDX;

* 
`index` sets the index value for a shader.

* 
`pName` allows applications to override the name specified in SPIR-V by **OpEntryPoint**.

If `pName` is `NULL` then the original name is used, as specified by `VkPipelineShaderStageCreateInfo::pName`.
If `index` is `VK_SHADER_INDEX_UNUSED_AMDX` then the original index is used, either as specified by the `ShaderIndexAMDX` `Execution` `Mode`, or `0` if that too is not specified.
If this structure is not provided, `pName` defaults to `NULL`, and `index` defaults to `VK_SHADER_INDEX_UNUSED_AMDX`.

When dispatching from another shader, the index is dynamic and can be specified in uniform control flow - however the name must be statically declared as a decoration on the payload.
Allowing the index to be set dynamically lets applications stream shaders in and out dynamically, by simply changing constant data and relinking the graph pipeline from new libraries.
Shaders with the same name and different indexes must consume identical payloads and have the same execution model.
Shaders with the same name in an execution graph pipeline must have unique indexes.

When dispatching from another shader, any declared input payload for the dispatched node must be less than or equal to the size of the output payload in the dispatching node.
Additionally, if an input payload is declared in the dispatched shader, the input and output payloads must specify members with the same decorations at the same offsets.

When adding a graphics pipeline to an execution graph pipeline, applications must specify a graphics pipeline with a complete set of state, and the `VK_PIPELINE_CREATE_2_LIBRARY_BIT_KHR` and `VK_PIPELINE_CREATE_2_EXECUTION_GRAPH_BIT_AMDX` flags set.
Graphics pipelines must only include mesh shaders; vertex shader pipelines or mesh pipelines with task shaders are not supported.
When creating such a graphics pipeline from libraries as an interaction with [VK_EXT_graphics_pipeline_library](https://docs.vulkan.org/spec/latest/appendices/extensions.html#VK_EXT_graphics_pipeline_library), those libraries must also have been created with those flags.

For graphics pipelines defined in this way, only the following dynamic state is allowed:

* 
`VK_DYNAMIC_STATE_VIEWPORT`

* 
`VK_DYNAMIC_STATE_SCISSOR`

* 
`VK_DYNAMIC_STATE_LINE_WIDTH`

* 
`VK_DYNAMIC_STATE_DEPTH_BIAS`

* 
`VK_DYNAMIC_STATE_BLEND_CONSTANTS`

* 
`VK_DYNAMIC_STATE_DEPTH_BOUNDS`

* 
`VK_DYNAMIC_STATE_VIEWPORT_WITH_COUNT`

* 
`VK_DYNAMIC_STATE_SCISSOR_WITH_COUNT`

* 
`VK_DYNAMIC_STATE_SAMPLE_LOCATIONS_EXT`

* 
`VK_DYNAMIC_STATE_FRAGMENT_SHADING_RATE_KHR`

When these dynamic states are specified, this state is captured from the command buffer state at the point the execution graph is dispatched, and applies to all nodes that have that state set dynamically executed as part of that dispatch.
All graphics pipelines in an execution graph must use the same set of dynamic states.
Applications can dynamically choose any other state at runtime by selecting between pipelines with different state when dispatching, but the underlying pipelines must be created statically.

When included as a library in an execution graph pipeline, the node is defined by the first shader in the graphics pipeline.

Implementations may need scratch memory to manage dispatch queues or similar when executing a pipeline graph, and this is explicitly managed by the application.

typedef struct VkExecutionGraphPipelineScratchSizeAMDX {
    VkStructureType                     sType;
    void*                               pNext;
    VkDeviceSize                        minSize;
    VkDeviceSize                        maxSize;
    VkDeviceSize                        sizeGranularity;
} VkExecutionGraphPipelineScratchSizeAMDX;

VkResult vkGetExecutionGraphPipelineScratchSizeAMDX(
    VkDevice                                    device,
    VkPipeline                                  executionGraph,
    VkExecutionGraphPipelineScratchSizeAMDX*    pSizeInfo);

Applications can query the required amount of scratch memory for a given pipeline, and the address of a buffer of that size must be provided when calling `vkCmdDispatchGraphAMDX`.
The amount of scratch memory needed by a given pipeline is related to the number and size of payloads across the whole graph; while the exact relationship is implementation dependent, reducing the number of unique nodes (different name string) and size of payloads can reduce scratch memory consumption.

A range of sizes are returned by the implementation; any size between `minSize` and `maxSize` can be used, though the actual memory consumed will be snapped to `minSize` + an integer multiple of `sizeGranularity`.
Choosing any value less than the maximum size will reduce memory pressure but will likely result in degraded performance.

Buffers created for this purpose must use the new buffer usage flags:

VK_BUFFER_USAGE_EXECUTION_GRAPH_SCRATCH_BIT_AMDX
VK_BUFFER_USAGE_2_EXECUTION_GRAPH_SCRATCH_BIT_AMDX

Scratch memory needs to be initialized against a graph pipeline before it can be used with that graph for the first time, using the following command:

void vkCmdInitializeGraphScratchMemoryAMDX(
    VkCommandBuffer                             commandBuffer,
    VkPipeline                                  executionGraph,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize);

This command initializes it for the execution graph pipeline `executionGraph` with the specified `scratchSize`.
Scratch memory will need to be re-initialized if it is going to be reused with a different execution graph pipeline, but can be used with the same pipeline repeatedly without re-initialization.
Scratch memory initialization can be synchronized using the compute pipeline stage `VK_PIPELINE_STAGE_COMPUTE_SHADER_BIT` and shader write access flag `VK_ACCESS_SHADER_WRITE_BIT`.

Once an execution graph has been created and scratch memory has been initialized for it, the following commands can be used to execute the graph:

typedef struct VkDispatchGraphInfoAMDX {
    uint32_t                                    nodeIndex;
    uint32_t                                    payloadCount;
    VkDeviceOrHostAddressConstAMDX              payloads;
    uint64_t                                    payloadStride;
} VkDispatchGraphInfoAMDX;

typedef struct VkDispatchGraphCountInfoAMDX {
    uint32_t                                    count;
    VkDeviceOrHostAddressConstAMDX              infos;
    uint64_t                                    stride;
} VkDispatchGraphCountInfoAMDX;

void vkCmdDispatchGraphAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    const VkDispatchGraphCountInfoAMDX*         pCountInfo);

void vkCmdDispatchGraphIndirectAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    const VkDispatchGraphCountInfoAMDX*         pCountInfo);

void vkCmdDispatchGraphIndirectCountAMDX(
    VkCommandBuffer                             commandBuffer,
    VkDeviceAddress                             scratch,
    VkDeviceSize                                scratchSize,
    VkDeviceAddress                             countInfo);

Each of the above commands enqueues payloads for an array of nodes in the bound execution graph pipeline, according to the contents of the `VkDispatchGraphCountInfoAMDX` and `VkDispatchGraphInfoAMDX` structures.

`vkCmdDispatchGraphAMDX` takes all of its arguments from the host pointers.
`VkDispatchGraphCountInfoAMDX::infos.hostAddress` is a pointer to an array of `VkDispatchGraphInfoAMDX` structures,
with stride equal to `VkDispatchGraphCountInfoAMDX::stride` and `VkDispatchGraphCountInfoAMDX::count` elements.

`vkCmdDispatchGraphIndirectAMDX` consumes most parameters on the host, but uses the device address for `VkDispatchGraphCountInfoAMDX::infos`, and also treating `payloads` parameters as device addresses.

`vkCmdDispatchGraphIndirectCountAMDX` consumes `countInfo` on the device and all child parameters also use device addresses.

Data consumed via a device address must be from buffers created with the `VK_BUFFER_USAGE_SHADER_DEVICE_ADDRESS_BIT` and `VK_BUFFER_USAGE_INDIRECT_BUFFER_BIT` usage flags set.
`payloads` is a pointer to a linear array of payloads in memory, with a stride equal to `payloadStride`.
`payloadCount` may be `0`.
The range of memory from `scratch` up to `scratchSize` may be used by the implementation to hold temporary data during graph execution, and can be synchronized using the compute pipeline stage and shader write access flags.

These dispatch commands must not be called in protected command buffers or secondary command buffers.

The size of the payload provided for each dispatched node must be at least as large as the **NodePayloadAMDX** declaration in the node, and the layout of the payload data in memory will be interpreted as it is laid out in the selected node’s shader, including any member decorations.
In particular, this means for nodes that consume indirect parameters from the payload, those parameters must be provided in the correct location as specified in the shader.
For example, for a compute shader that does not include a `StaticNumWorkgroupsAMDX` or `CoalescingAMDX` declaration, each dispatch will consume a payload structure containing a member decorated with **PayloadDispatchIndirectAMDX** that indicates the number of workgroups to dispatch in each dimension.

Node payload members must be *explicitly laid out* with offset and array stride decorations, both in the input and output.

* 
If the dispatched shader uses `GLCompute` or `MeshEXT` `Execution Model`, then it is allowed to not specify the input payload.
In this case, the payload is defined implicitly as follows:

If the `StaticNumWorkgroupsAMDX` or `CoalescingAMDX` execution modes are specified, the payload is empty.

* 
Otherwise, the payload is a structure with a single member that is a vector of three 32-bit unsigned integers.

Payloads are always read (including built-in values) according to the input payload definition - the output payload definition must have the same size as the expected input, but does not otherwise need to match.
Applications must take care to ensure that values are where they expect them.

The `nodeIndex` is a unique integer identifier identifying a specific shader name and shader index (defined by `VkPipelineShaderStageNodeCreateInfoAMDX`) added to the executable graph pipeline.
`vkGetExecutionGraphPipelineNodeIndexAMDX` can be used to query the identifier for a given node:

VkResult vkGetExecutionGraphPipelineNodeIndexAMDX(
    VkDevice                                        device,
    VkPipeline                                      executionGraph,
    const VkPipelineShaderStageNodeCreateInfoAMDX*  pNodeInfo,
    uint32_t*                                       pNodeIndex);

`pNodeInfo` specifies the shader name and index as set up when creating the pipeline, with the associated node index returned in `pNodeIndex`.
When used with this function, `pNodeInfo→pName` must not be `NULL`.

|  | To summarize, execution graphs use two kinds of indexes:
| --- | --- |

*shader index* specified in `VkPipelineShaderStageNodeCreateInfoAMDX` and used to enqueue payloads,

*node index* specified in `VkDispatchGraphInfoAMDX` and used only for launching the graph from a command buffer. |

Execution graph pipelines and their resources are bound using a new pipeline bind point:

VK_PIPELINE_BIND_POINT_EXECUTION_GRAPH_AMDX

The following new properties are added to Vulkan:

typedef VkPhysicalDeviceShaderEnqueuePropertiesAMDX {
    VkStructureType                     sType;
    void*                               pNext;
    uint32_t                            maxExecutionGraphDepth;
    uint32_t                            maxExecutionGraphShaderOutputNodes;
    uint32_t                            maxExecutionGraphShaderPayloadSize;
    uint32_t                            maxExecutionGraphShaderPayloadCount;
    uint32_t                            executionGraphDispatchAddressAlignment;
    uint32_t                            maxExecutionGraphWorkgroupCount[3];
    uint32_t                            maxExecutionGraphWorkgroups;
} VkPhysicalDeviceShaderEnqueuePropertiesAMDX;

Each limit is defined as follows:

* 
`maxExecutionGraphDepth` defines the maximum node chain length in the graph, and must be at least 32.
A node that is dispatched with an API command is at depth 1 and the node that receives a payload from it is at depth 2, and so on.
If a node uses tail recursion, each recursive call increases the depth by 1 as well.

* 
`maxExecutionGraphShaderOutputNodes` specifies the maximum number of unique nodes that can be dispatched from a single shader, and must be at least 256.

* 
`maxExecutionGraphShaderPayloadSize` specifies the maximum total size of payload declarations in a shader, and must be at least 32KB.

* 
`maxExecutionGraphShaderPayloadCount` specifies the maximum number of output payloads that can be initialized in a single workgroup, and must be at least 256.

* 
`executionGraphDispatchAddressAlignment` specifies the alignment of non-scratch `VkDeviceAddress` arguments consumed by graph dispatch commands, and must be no more than 4 bytes.

* 
`maxExecutionGraphWorkgroupCount[3]` describes the maximum number of local workgroups that a shader can be dispatched with,
and must be at least (65535, 65535, 65535) for the X, Y, and Z dimensions, respectively.

* 
`maxExecutionGraphWorkgroups` describes the total number of local workgroups that a shader can be dispatched with and must be at least 16777215.

The following new features are added to Vulkan:

typedef VkPhysicalDeviceShaderEnqueueFeaturesAMDX {
    VkStructureType                     sType;
    void*                               pNext;
    VkBool32                            shaderEnqueue;
    VkBool32                            shaderMeshEnqueue;
} VkPhysicalDeviceShaderEnqueueFeaturesAMDX;

The `shaderEnqueue` feature enables the ability to enqueue compute shader workgroups from other compute shaders.
The `shaderMeshEnqueue` feature enables the ability to enqueue mesh nodes in an execution graph.

A new capability is added:

| Capability | Enabling Capabilities |
| --- | --- |
| 5067 | **ShaderEnqueueAMDX**

Uses shader enqueue capabilities | **Shader** |

A new storage class is added:

| Storage Class | Enabling Capabilities |
| --- | --- |
| 5068 | **NodePayloadAMDX**

Storage for Node Payloads.

Variables declared with **OpVariable** in the **GLCompute** execution model with the **CoalescingAMDX** execution mode are visible across all invocations within a workgroup; and other variables declared with **OpVariable** in this storage class are visible across all invocations within a node dispatch.
Variables declared with this storage class are readable and writable, and must not have initializers.

Pointers to this storage class are also used to point to payloads allocated and enqueued for other nodes. | **ShaderEnqueueAMDX** |

An entry point must only declare one variable in the `NodePayloadAMDX` storage class in its interface.

New execution modes are added:

| Execution Mode | Extra Operands | Enabling Capabilities |
| --- | --- | --- |
| 5069 | **CoalescingAMDX**

Indicates that a GLCompute shader has coalescing semantics. (GLCompute only)

Must not be declared alongside **StaticNumWorkgroupsAMDX** or **MaxNumWorkgroupsAMDX**. |  | **ShaderEnqueueAMDX** |
| 5071 | **MaxNodeRecursionAMDX**

Maximum number of times a node can enqueue payloads for itself. | **

*Number of recursions* | **ShaderEnqueueAMDX** |
| 5070 | **IsApiEntryAMDX**

Indicates whether the shader can be dispatched directly by the client API or not. (GLCompute and MeshEXT execution models only)

*Is Entry* is a scalar Boolean value, with a value of **true** indicating that it can be dispatched from the API, and **false** indicating that it cannot.
If not specified, defaults to **true**.

Must be set to **false** if **SharesInputWithAMDX** is specified. | **

*Is Entry* | **ShaderEnqueueAMDX** |
| 5072 | **StaticNumWorkgroupsAMDX**

Statically declare the number of workgroups dispatched for this shader, instead of obeying an API- or payload-specified value. (GLCompute and MeshEXT only)

Must not be declared alongside **CoalescingAMDX** or **MaxNumWorkgroupsAMDX**. | **

*x size* | **

*y size* | **

*z size* | **ShaderEnqueueAMDX** |
| 5077 | **MaxNumWorkgroupsAMDX**

Declare the maximum number of workgroups dispatched for this shader. Dispatches must not exceed this value (GLCompute and MeshEXT only)

Must not be declared alongside **CoalescingAMDX** or **StaticNumWorkgroupsAMDX**. | **

*x size* | **

*y size* | **

*z size* | **ShaderEnqueueAMDX** |
| 5073 | **ShaderIndexAMDX**

Declare the node index for this shader. (GLCompute and MeshEXT only) | **

*Shader Index* | **ShaderEnqueueAMDX** |
| 5102 | **SharesInputWithAMDX**

Declare that this shader is paired with another node, such that it will be dispatched with the same input payload when the identified node is dispatched.

*Node Name* and *Shader Index* indicate the node that the input will be shared with.

*Node Name* must be an **OpConstantStringAMDX** or **OpSpecConstantStringAMDX** instruction. | *Node Name* | **

*Shader Index* |  | **ShaderEnqueueAMDX** |

A shader module declaring `ShaderEnqueueAMDX` capability must only be used in execution graph pipelines created by
`vkCreateExecutionGraphPipelinesAMDX` command.

`MaxNodeRecursionAMDX` must be specified if a shader re-enqueues itself, which takes place if that shader
allocates and enqueues a payload for the same node *name* and *index*. Other forms of recursion are not allowed.

An application must not dispatch the shader with a number of workgroups in any dimension greater than the values specified by `MaxNumWorkgroupsAMDX`.

`StaticNumWorkgroupsAMDX` allows the declaration of the number of workgroups to dispatch to be coded into the shader itself, which can be useful for optimizing some algorithms. When a compute shader is dispatched using existing `vkCmdDispatchGraph*` commands, the workgroup counts specified there are overridden. When enqueuing such shaders with a payload, these arguments will not be consumed from the payload before application-specified data begins.

The values of `MaxNumWorkgroupsAMDX` and `StaticNumWorkgroupsAMDX` must be less than or equal to `[VkPhysicalDeviceShaderEnqueuePropertiesAMDX](https://docs.vulkan.org/spec/latest/chapters/limits.html#VkPhysicalDeviceShaderEnqueuePropertiesAMDX)::maxExecutionGraphWorkgroupCount`.

The product of the X, Y, and Z values of `MaxNumWorkgroupsAMDX` and `StaticNumWorkgroupsAMDX` must be less than or equal to `[VkPhysicalDeviceShaderEnqueuePropertiesAMDX](https://docs.vulkan.org/spec/latest/chapters/limits.html#VkPhysicalDeviceShaderEnqueuePropertiesAMDX)::maxExecutionGraphWorkgroups`.

The arguments to each of these execution modes must be a constant 32-bit integer value, and may be supplied via specialization constants.

When a **GLCompute** or **MeshEXT** shader is being used in an execution graph, `NumWorkgroups` must not be used.

When **CoalescingAMDX** is used, it has the following effects on a compute shader’s inputs and outputs:

* 
The `WorkgroupId` built-in is always `(0,0,0)`

* 
NB: This affects related built-ins like `GlobalInvocationId`

* 
So similar to `StaticNumWorkgroupsAMDX`, no dispatch size is consumed from the payload-specified

* 
The input in the `NodePayloadAMDX` storage class must have a type of `OpTypeNodePayloadArrayAMDX`.

* 
This input must be decorated with `NodeMaxPayloadsAMDX`, indicating the number of payloads that can be received.

* 
The number of payloads received can be queried through `OpNodePayloadArrayLengthAMDX`

When **SharesInputWithAMDX** is declared, the node will be dispatched whenever the node identified by it is dispatched, with the same input payload.
The following limitations apply for sharing nodes in this way:

* 
Nodes must only share with a node that does not declare **SharesInputWithAMDX**

* 
No more than 256 nodes in a graph can share the same input (including the base node)

* 
Applications must not directly dispatch any node with the **SharesInputWithAMDX** execution mode.

* 
Input payloads must be decorated with *NonWritable* if **SharesInputWithAMDX** is declared.

* 
Emitting a payload to a shared node multiplies all of the payload resources by the number of shared nodes, as they count against values in `VkPhysicalDeviceShaderEnqueuePropertiesAMDX`.

If **IsApiEntryAMDX** is set to **false**, `vkCmdDispatchGraph*` commands must not reference this node.

New decorations are added:

| Decoration | Extra Operands | Enabling Capabilities |
| --- | --- | --- |
| 5020 | **NodeMaxPayloadsAMDX**

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX**.

**OpTypeNodePayloadArrayAMDX** must have this decoration.
The operand indicates the maximum number of payloads that can be in the array, and the maximum number of payloads that can be enqueued with this type. | **

*Max number of payloads* | **ShaderEnqueueAMDX** |
| 5019 | **NodeSharesPayloadLimitsWithAMDX**

Decorates an **OpTypeNodePayloadArrayAMDX** declaration to indicate that payloads of this type share output resources with *Payload Type* when allocated.

Without the decoration, each types’s resources are separately allocated against the output limits; by using the decoration only the limits of *Payload Type* are considered.
Applications must still ensure that at runtime the actual usage does not exceed these limits, as this decoration only modifies static validation.

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX** declaration,
*Payload Type* must be a different **OpTypeNodePayloadArrayAMDX** declaration, and
*Payload Type* must not be itself decorated with **NodeSharesPayloadLimitsWithAMDX**.

It is only necessary to decorate one **OpTypeNodePayloadArrayAMDX** declaration to indicate sharing between two node outputs.
Multiple variables can be decorated with the same *Payload Type* to indicate sharing across multiple node outputs. | **

*Payload Type* | **ShaderEnqueueAMDX** |
| 5091 | **PayloadNodeNameAMDX**

Decorates an **OpTypeNodePayloadArrayAMDX** declaration to indicate that the payloads in the array
will be enqueued for the shader with *Node Name*.

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX** declaration.

*Node Name* must be an **OpConstantStringAMDX** or **OpSpecConstantStringAMDX** instruction. | **

*Node Name* | **ShaderEnqueueAMDX** |
| 5098 | **PayloadNodeBaseIndexAMDX**

Decorates an **OpTypeNodePayloadArrayAMDX** declaration to indicate a base index that
will be added to the *Node Index* when allocating payloads of this type.
If not specified, it is equivalent to specifying a value of 0.

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX** declaration. | **

*Base Index* | **ShaderEnqueueAMDX** |
| 5099 | **PayloadNodeSparseArrayAMDX**

Decorates an **OpTypeNodePayloadArrayAMDX** declaration to indicate that nodes at some node indexes may not exist in the execution graph pipeline and cannot be used to allocate payloads.

If not specified, all node indexes between 0 and the **PayloadNodeArraySizeAMDX** value must be valid nodes in the graph.

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX** declaration. |  | **ShaderEnqueueAMDX** |
| 5100 | **PayloadNodeArraySizeAMDX**

Decorates an **OpTypeNodePayloadArrayAMDX** declaration to indicate the maximum node index that can be used when allocating payloads of this type, including the base index offset in **PayloadNodeBaseIndexAMDX** decoration (if present).
If not specified, the node array is considered unbounded.

Must only be used to decorate an **OpTypeNodePayloadArrayAMDX** declaration.

If **PayloadNodeSparseArrayAMDX** is not set to **true** for a type initialized by **OpAllocateNodePayloadsAMDX**, this must be specified. | **

*Array Size* | **ShaderEnqueueAMDX** |
| 5078 | **TrackFinishWritingAMDX**

Decorates a structure to indicate that when used as a payload it can be written to and works with the **OpFinishWritingNodePayloadAMDX** instruction.

Must only be used to decorate a structure type declaration.

If the payload enqueued for a node is using a structure decorated with this value, the input payload in the **NodePayloadAMDX** storage class in the receiving node must use a structure decorated with it as well. |  | **ShaderEnqueueAMDX** |
| 5105 | **PayloadDispatchIndirectAMDX**

Indicates the dispatch indirect arguments describing the number of workgroups to dispatch in a payload.
Must only be used with **OpMemberDecorate** to decorate the member of a structure.
Must decorate a structure member with a type of **OpTypeInt** or **OpTypeVector** with two or three components.
The integer type or the type of the vector component must be an **OpTypeInt** with up to 32-bit *Width* and 0 *Signedness*.
If a single integer is used, the Y and Z dispatch indirect arguments are assumed to be 1.
If a vector of two components is used, the Z dispatch indirect argument is assumed to be 1. |  | **ShaderEnqueueAMDX** |

The following new built-ins are provided:

| BuiltIn | Enabling Capabilities |
| --- | --- |
| 5021 | **RemainingRecursionLevelsAMDX**

The number of times this node can still enqueue payloads for itself.

Is equal to 0 if at the leaf or if the node is not recursive at all. | **ShaderEnqueueAMDX** |
| 5073 | **ShaderIndexAMDX**

Index assigned to the current shader. | **ShaderEnqueueAMDX** |

If the `Execution Model` is `GLCompute` or `MeshEXT`, and neither the `StaticNumWorkgroupsAMDX` or `CoalescingAMDX` execution modes are specified, if an input payload is specified it must include a member with the **PayloadDispatchIndirectAMDX** decoration, indicating the number of workgroups to dispatch in each dimension.

New constant instructions are added to allow specialization of string variables, which are used for linkage between shaders.

| **OpConstantStringAMDX**
| --- | --- | --- | --- |

Declare a new string specialization constant.

*String* is the value of the constant.

Unlike **OpString**, this is a semantically meaningful instruction and cannot be safely removed from a module. | Capability:

**ShaderEnqueueAMDX** |
| 3 + variable | 5103 | *Result * | *Literal*

*String* |

| **OpSpecConstantStringAMDX**
| --- | --- | --- | --- |

Declare a new string specialization constant.

*String* is the default value of the constant.

Unlike **OpString**, this is a semantically meaningful instruction and cannot be safely removed from a module.

This instruction can be specialized to become an **OpConstantStringAMDX** instruction.

See *Specialization*. | Capability:

**ShaderEnqueueAMDX** |
| 3 + variable | 5104 | *Result * | *Literal*

*String* |

A new payload type is defined that can be allocated dynamically and then enqueued for a node:

| **OpTypeNodePayloadArrayAMDX**
| --- | --- | --- | --- |

Declare a new payload array type.  Its length is not known at compile time.

*Payload Type* is the type of each payload in the array.

 See [**OpNodePayloadArrayLengthAMDX**](#OpNodePayloadArrayLengthAMDX) for getting the length of an array of this type.

A payload array can be allocated by either **OpAllocateNodePayloadsAMDX** to be enqueued as an output, or via **OpVariable** in the **NodePayloadAMDX** storage class to be consumed as an input.

Can be dereferenced using an access chain in the same way as **OpTypeRuntimeArray** or **OpTypeArray**. | Capability:

**Shader** |
| 3 | 5076 | *Result * | **

*Payload Type* |

Decorations on this type indicate which node this type will be dispatched to and how it consumes resources.
Once a payload array type has been declared and all relevant decorations specified, they can be allocated using:

| **OpAllocateNodePayloadsAMDX**
| --- | --- | --- | --- | --- | --- | --- |

Allocates payloads for a node to be later enqueued via **OpEnqueueNodePayloadsAMDX**.

*Result Type* must be an **OpTypePointer** to an **OpTypeNodePayloadArrayAMDX** in the **NodePayloadAMDX** storage class.

The payloads are allocated for the node identified by the *Node Name* in the **PayloadNodeNameAMDX** decoration on *Result Type*,
with an index equal to the sum of its **PayloadNodeBaseIndexAMDX** decoration (if present) and *Node Index*.

Payloads are allocated for the *Scope* indicated by *Visibility*, and are visible to all invocations in that *Scope*.

*Payload Count* is the number of payloads to allocate in the resulting array.

Behavior is undefined if *Payload Count* is greater than the **NodeMaxPayloadsAMDX** decoration on *Result Type*.

*Payload Count* and *Node Index* must be dynamically uniform within the scope identified by *Visibility*.

*Visibility* must only be either *Invocation* or *Workgroup*.

This instruction must be called in uniform control flow within the same workgroup. | Capability:

**ShaderEnqueueAMDX** |
| 6 | 5074 | **

*Result Type* | *Result* ** | *Scope *

*Visibility* | **

*Payload Count* | **

*Node Index* |

Once a payload array is allocated, it can be enqueued to the identified node by calling **OpEnqueueNodePayloadsAMDX**.
Enqueues are performed in the same manner as the `vkCmdDispatchGraph*` API commands.
If the node receiving the payloads has the `CoalescingAMDX` execution mode, there is no guarantee what set of payloads are visible to the same workgroup.

The shader must not enqueue payloads to a shader with the same name as this shader unless the index identifies this node and `MaxNodeRecursionAMDX` is declared with a sufficient depth.
Shaders with the same name and different indexes can each recurse independently.

| **OpEnqueueNodePayloadsAMDX**
| --- | --- | --- |

Enqueues a previously allocated payload array for execution by its node.

*Payload Array* is a pointer to a payload array that was previously allocated by **OpAllocateNodePayloadsAMDX**.

This instruction must be called in uniform control flow within the workgroup. | Capability:

**ShaderEnqueueAMDX** |
| 2 | 5075 | **

*Payload Array* |

Once this has been called, accessing any element of *Payload Array* is undefined behavior.

The length of *Payload Array* can be queried at any point by calling:

| **OpNodePayloadArrayLengthAMDX**
| --- | --- | --- | --- | --- |

Query the length of a payload array. Must only be used with input payload arrays or allocated output payload arrays.

*Result* will be equal to the *Payload Count* value used to allocate *Payload Array*, or to the number of received payloads if the shader is using **CoalescingAMDX** execution mode. Otherwise, *Result* will be 1.

*Result Type* must be an **OpTypeInt** with 32-bit *Width* and 0 *Signedness*.

*Payload Array* is a pointer to a payload array previously allocated by **OpAllocateNodePayloadsAMDX**, or declared via **OpVariable** in the **NodePayloadAMDX** storage class as an input. | Capability:

**Shader** |
| 4 | 5090 | **

*Result Type* | *Result * | **

*Payload Array* |

Before allocating payloads, applications can determine whether allocating payloads is possible for a particular node index:

* 
If a payload type is decorated with **PayloadNodeSparseArrayAMDX**, applications can determine whether a node exists at a particular index.

* 
If a payload type is decorated with **PayloadNodeNameAMDX** that matches the current node, applications can determine whether a node at a particular index has reached its max recursion depth.

* 
In all other cases, the payload can be allocated.

| **OpIsNodePayloadValidAMDX**
| --- | --- | --- | --- | --- | --- |

Check if the node payload identified by the *Node Name* in the **PayloadNodeNameAMDX** decoration,
with an index equal to the sum of its **PayloadNodeBaseIndexAMDX** decoration (if present) and *Node Index*
can be allocated.

*Result* is equal to **OpConstantTrue** if the payload is valid and can be allocated, **OpConstantFalse** otherwise.

*Result Type* must be **OpTypeBool**.

*Payload Type* must be an **OpTypeNodePayloadArrayAMDX** declaration.

*NodeIndex* must be less than the value specified by the **PayloadNodeArraySizeAMDX** decoration if specified. | Capability:

**ShaderEnqueueAMDX** |
| 5 | 5101 | **

*Result Type* | *Result* ** | **

*Payload Type* | **

*Node Index* |

Payloads enqueued in this way will be provided to the node through the **NodePayloadAMDX** storage class in the shader.
These payloads can be read by the receiving node, but also can be written for a limited amount of communication between multiple workgroups enqueued for the same node.
It is a data race if one workgroup writes to a particular element of the payload and another workgroup accesses it in any way, with one exception; once all nodes have finished writing, it is safe for the last node to read those values.
Workgroups can indicate that they have finished writing to the payload by calling:

| **OpFinishWritingNodePayloadAMDX**
| --- | --- | --- | --- | --- |

Optionally indicates that all writes to the input payload by the current workgroup have completed.

*Result* is equal to **OpConstantTrue** if all workgroups that can access this payload have called this function.

Must not be called if the shader is using **CoalescingAMDX** execution mode,
or if the shader was dispatched with a `vkCmdDispatchGraph*` client API command,
rather than enqueued from another shader.

Must not be called if the input payload is not decorated with **TrackFinishWritingAMDX**.

*Result Type* must be **OpTypeBool**.

*Payload* must be the result of an **OpVariable** in the **NodePayloadAMDX** storage class. | Capability:

**ShaderEnqueueAMDX** |
| 4 | 5078 | **

*Result Type* | *Result* ** | **

*Payload* |

Once this has been called for a given payload, writing values into that payload by the current invocation/workgroup is undefined behavior.

It works the same as any other dispatch commands - work is replicated to all devices unless applications split the work themselves.
There is no automatic scheduling between devices.

A subset of dynamic state is supported.

For now, this specification exposes basic "value" state - primarily things where there is only a value to modify rather than a mode switch or state enable.
