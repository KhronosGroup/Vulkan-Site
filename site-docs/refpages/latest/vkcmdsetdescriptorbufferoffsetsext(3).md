# vkCmdSetDescriptorBufferOffsetsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/vkCmdSetDescriptorBufferOffsetsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Parameters](#_parameters)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

vkCmdSetDescriptorBufferOffsetsEXT - Setting descriptor buffer offsets in a command buffer

To set descriptor buffer offsets in a command buffer, call:

|  | This functionality is superseded by [VK_EXT_descriptor_heap](VK_EXT_descriptor_heap.html). See [Legacy Functionality](../../../../spec/latest/appendices/legacy.html#legacy-descriptor-sets) for more information. |
| --- | --- |

// Provided by VK_EXT_descriptor_buffer
void vkCmdSetDescriptorBufferOffsetsEXT(
    VkCommandBuffer                             commandBuffer,
    VkPipelineBindPoint                         pipelineBindPoint,
    VkPipelineLayout                            layout,
    uint32_t                                    firstSet,
    uint32_t                                    setCount,
    const uint32_t*                             pBufferIndices,
    const VkDeviceSize*                         pOffsets);

* 
`commandBuffer` is the command buffer in which the descriptor buffer
offsets will be set.

* 
`pipelineBindPoint` is a [VkPipelineBindPoint](VkPipelineBindPoint.html) indicating the
type of the pipeline that will use the descriptors.

* 
`layout` is a [VkPipelineLayout](VkPipelineLayout.html) object used to program the
bindings.

* 
`firstSet` is the number of the first set to be bound.

* 
`setCount` is the number of elements in the `pBufferIndices` and
`pOffsets` arrays.

* 
`pBufferIndices` is a pointer to an array of indices into the
descriptor buffer binding points set by
[vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html).

* 
`pOffsets` is a pointer to an array of `VkDeviceSize` offsets
to apply to the bound descriptor buffers.

`vkCmdSetDescriptorBufferOffsetsEXT` binds `setCount` pairs of
descriptor buffers, specified by indices into the binding points bound using
[vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html), and buffer offsets to set numbers
[`firstSet`..`firstSet`+`setCount`-1] for subsequent
[bound pipeline commands](../../../../spec/latest/chapters/pipelines.html#pipelines-bindpoint-commands) set by
`pipelineBindPoint`.
Set [`firstSet` + i] is bound to the descriptor buffer at binding
`pBufferIndices`[i] at an offset of `pOffsets`[i].
Any bindings that were previously applied via these sets, or calls to
[vkCmdBindDescriptorSets](vkCmdBindDescriptorSets.html), are no longer valid.
Other sets will also be invalidated upon calling this command if
`layout` differs from the pipeline layout used to bind those other sets,
as described in [Pipeline Layout Compatibility](../../../../spec/latest/chapters/descriptorsets.html#descriptors-compatibility).

After binding descriptors, applications **can** modify descriptor memory either
by performing writes on the host or with device commands.
When descriptor memory is updated with device commands, visibility for the
shader stage accessing a descriptor is ensured with the
[VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT_EXT](VkAccessFlagBits2.html) access flag.
Implementations **must** not access resources referenced by these descriptors
unless they are dynamically accessed by shaders.
Descriptors bound with this call **can** be **undefined** if they are not
dynamically accessed by shaders.

Implementations **may** read descriptor data for any statically accessed
descriptor if the `binding` in `layout` is not declared with the
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html) flag.
If the `binding` in `layout` is declared with
[VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html), implementations
**must** not read descriptor data that is not dynamically accessed.

Applications **must** ensure that any descriptor which the implementation **may**
read **must** be in-bounds of the underlying descriptor buffer binding.

|  | Applications can freely decide how large a variable descriptor buffer
| --- | --- |
binding is, so it may not be safe to read such descriptor payloads
statically.
The intention of these rules is to allow implementations to speculatively
prefetch descriptor payloads where feasible. |

Dynamically accessing a resource through descriptor data from an unbound
region of a [sparse partially-resident buffer](../../../../spec/latest/chapters/sparsemem.html#sparsememory-partially-resident-buffers) will result in invalid descriptor data being
read, and therefore **undefined** behavior.

|  | For descriptors written by the host, visibility is implied through the
| --- | --- |
automatic visibility operation on queue submit, and there is no need to
consider `VK_ACCESS_2_DESCRIPTOR_BUFFER_READ_BIT`.
Explicit synchronization for descriptors is only required when descriptors
are updated on the device. |

|  | The requirements above imply that all descriptor bindings have been defined
| --- | --- |
with the equivalent of [VK_DESCRIPTOR_BINDING_UPDATE_AFTER_BIND_BIT](VkDescriptorBindingFlagBits.html),
[VK_DESCRIPTOR_BINDING_UPDATE_UNUSED_WHILE_PENDING_BIT](VkDescriptorBindingFlagBits.html) and
[VK_DESCRIPTOR_BINDING_PARTIALLY_BOUND_BIT](VkDescriptorBindingFlagBits.html), but enabling those features
is not required to get this behavior. |

Valid Usage

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11295

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pSamplerHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-11296

If `commandBuffer` is a secondary command buffer, it **must** have
begun with
[VkCommandBufferInheritanceDescriptorHeapInfoEXT](VkCommandBufferInheritanceDescriptorHeapInfoEXT.html)::`pResourceHeapBindInfo`
equal to `NULL`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08061

The offsets in `pOffsets` **must** be aligned to
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`descriptorBufferOffsetAlignment`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08063

The offsets in `pOffsets` **must** be small enough such that any
descriptor binding referenced by `layout`
without the [VK_DESCRIPTOR_BINDING_VARIABLE_DESCRIPTOR_COUNT_BIT](VkDescriptorBindingFlagBits.html)
flag
computes a valid address inside the underlying [VkBuffer](VkBuffer.html)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08126

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a sampler descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxSamplerDescriptorBufferRange`
of the sampler descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-08127

The offsets in `pOffsets` **must** be small enough such that any
location accessed by a shader as a resource descriptor **must** be within
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxResourceDescriptorBufferRange`
of the resource descriptor buffer binding

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08064

Each element of `pBufferIndices` **must** be less than
[VkPhysicalDeviceDescriptorBufferPropertiesEXT](VkPhysicalDeviceDescriptorBufferPropertiesEXT.html)::`maxDescriptorBufferBindings`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-08065

Each element of `pBufferIndices` **must** reference a valid descriptor
buffer binding set by a previous call to
[vkCmdBindDescriptorBuffersEXT](vkCmdBindDescriptorBuffersEXT.html) in `commandBuffer`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-08066

The sum of `firstSet` and `setCount` **must** be less than or equal
to [VkPipelineLayoutCreateInfo](VkPipelineLayoutCreateInfo.html)::`setLayoutCount` provided when
`layout` was created

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-09006

The [VkDescriptorSetLayout](VkDescriptorSetLayout.html) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_DESCRIPTOR_BUFFER_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11803

The [VkDescriptorSetLayout](VkDescriptorSetLayout.html) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_PUSH_DESCRIPTOR_BIT_KHR](VkDescriptorSetLayoutCreateFlagBits.html) bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804) VUID-vkCmdSetDescriptorBufferOffsetsEXT-firstSet-11804

The [VkDescriptorSetLayout](VkDescriptorSetLayout.html) for each set from `firstSet` to
`firstSet` +  `setCount` when `layout` was created
**must** not have been created with the
[VK_DESCRIPTOR_SET_LAYOUT_CREATE_EMBEDDED_IMMUTABLE_SAMPLERS_BIT_EXT](VkDescriptorSetLayoutCreateFlagBits.html)
bit set

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060) VUID-vkCmdSetDescriptorBufferOffsetsEXT-None-08060

The [`descriptorBuffer`](../../../../spec/latest/chapters/features.html#features-descriptorBuffer) feature **must**
be enabled

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-08067

`pipelineBindPoint` **must** be supported by the `commandBuffer`’s
parent `VkCommandPool`’s queue family

Valid Usage (Implicit)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-parameter

 `commandBuffer` **must** be a valid [VkCommandBuffer](VkCommandBuffer.html) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pipelineBindPoint-parameter

 `pipelineBindPoint` **must** be a valid [VkPipelineBindPoint](VkPipelineBindPoint.html) value

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-layout-parameter

 `layout` **must** be a valid [VkPipelineLayout](VkPipelineLayout.html) handle

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pBufferIndices-parameter

 `pBufferIndices` **must** be a valid pointer to an array of `setCount` `uint32_t` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter) VUID-vkCmdSetDescriptorBufferOffsetsEXT-pOffsets-parameter

 `pOffsets` **must** be a valid pointer to an array of `setCount` `VkDeviceSize` values

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-recording

 `commandBuffer` **must** be in the [recording state](../../../../spec/latest/chapters/cmdbuffers.html#commandbuffers-lifecycle)

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commandBuffer-cmdpool

 The `VkCommandPool` that `commandBuffer` was allocated from **must** support [VK_QUEUE_COMPUTE_BIT](VkQueueFlagBits.html), [VK_QUEUE_DATA_GRAPH_BIT_ARM](VkQueueFlagBits.html), or [VK_QUEUE_GRAPHICS_BIT](VkQueueFlagBits.html) operations

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding) VUID-vkCmdSetDescriptorBufferOffsetsEXT-videocoding

 This command **must** only be called outside of a video coding scope

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength) VUID-vkCmdSetDescriptorBufferOffsetsEXT-setCount-arraylength

 `setCount` **must** be greater than `0`

* 
[](#VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent) VUID-vkCmdSetDescriptorBufferOffsetsEXT-commonparent

 Both of `commandBuffer`, and `layout` **must** have been created, allocated, or retrieved from the same [VkDevice](VkDevice.html)

Host Synchronization

* 
Host access to `commandBuffer` **must** be externally synchronized

* 
Host access to the `VkCommandPool` that `commandBuffer` was allocated from **must** be externally synchronized

Command Properties
| [Command Buffer Levels](../../../../spec/latest/chapters/cmdbuffers.html#VkCommandBufferLevel) | [Render Pass Scope](../../../../spec/latest/chapters/renderpass.html#vkCmdBeginRenderPass) | [Video Coding Scope](../../../../spec/latest/chapters/videocoding.html#vkCmdBeginVideoCodingKHR) | [Supported Queue Types](../../../../spec/latest/chapters/devsandqueues.html#VkQueueFlagBits) | [Command Type](../../../../spec/latest/chapters/fundamentals.html#fundamentals-queueoperation-command-types) |
| --- | --- | --- | --- | --- |
| Primary

Secondary | Both | Outside | VK_QUEUE_COMPUTE_BIT

VK_QUEUE_DATA_GRAPH_BIT_ARM

VK_QUEUE_GRAPHICS_BIT | State |

Conditional Rendering

vkCmdSetDescriptorBufferOffsetsEXT is not affected by [conditional rendering](../../../../spec/latest/chapters/drawing.html#drawing-conditional-rendering)

[VK_EXT_descriptor_buffer](VK_EXT_descriptor_buffer.html), [VkCommandBuffer](VkCommandBuffer.html), `VkDeviceSize`, [VkPipelineBindPoint](VkPipelineBindPoint.html), [VkPipelineLayout](VkPipelineLayout.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/descriptorbuffers.html#vkCmdSetDescriptorBufferOffsetsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
