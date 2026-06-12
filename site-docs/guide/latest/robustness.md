# Robustness

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/robustness.html

## Table of Contents

- [What does robustness mean](#_what_does_robustness_mean)
- [What_does_robustness_mean](#_what_does_robustness_mean)
- [When to use](#_when_to_use)
- [When_to_use](#_when_to_use)
- [What Vulkan provides in core](#_what_vulkan_provides_in_core)
- [What_Vulkan_provides_in_core](#_what_vulkan_provides_in_core)
- [robustBufferAccess](#_robustbufferaccess)
- [VK_EXT_image_robustness](#_vk_ext_image_robustness)
- [robustImageAccess](#_robustimageaccess)
- [VK_KHR_robustness2](#_vk_khr_robustness2)
- [robustBufferAccess2](#_robustbufferaccess2)
- [robustImageAccess2](#_robustimageaccess2)
- [nullDescriptor](#_nulldescriptor)
- [VK_EXT_pipeline_robustness](#_vk_ext_pipeline_robustness)
- [VK_EXT_descriptor_indexing](#_vk_ext_descriptor_indexing)

## Content

When a Vulkan application tries to access (load, store, or perform an atomic on) memory it doesn’t have access to, the implementation must react somehow. In the case where there is no robustness, it is undefined behavior and the implementation is even allowed to terminate the program. If robustness is enabled for the type of memory accessed, then the implementation must behave a certain way as defined by the spec.

![robustness_flow.png](_images/robustness_flow.png)

Some common cases for using robustness are

Need to prevent malicious memory accesses (ex. WebGPU).

Can’t guarantee your shader will not be out-of-bounds

Mimic out-of-bounds behavior observed elsewhere

|  | Important
| --- | --- |

Turning on robustness may incur a runtime performance cost. Application writers should carefully consider the implications of enabling robustness. |

All Vulkan implementations are required to support the `robustBufferAccess` feature. The [spec describes what is considered out-of-bounds](https://docs.vulkan.org/spec/latest/chapters/features.html#features-robustBufferAccess) and also how it should be handled. Implementations are given some amount of flexibility for `robustBufferAccess`. An example would be accessing a `vec4(x,y,z,w)` where the `w` value is out-of-bounds as the spec allows the implementation to decide if the `x`, `y`, and `z` are also considered out-of-bounds or not.

The `robustBufferAccess` feature has some limitations as it only covers buffers and not images. It also allows out-of-bounds writes and atomics to modify the data of the buffer being accessed. For applications looking for a stronger form of robustness, there is [VK_KHR_robustness2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_robustness2.html).

When images are out-of-bounds core Vulkan [provides the guarantee](https://docs.vulkan.org/spec/latest/chapters/textures.html#textures-output-coordinate-validation) that stores and atomics have no effect on the memory being accessed.

The following is an example of using `robustBufferAccess`. ([Try Online](https://godbolt.org/z/d5rqK1aqK))

#version 450
layout(set = 0, binding = 0) buffer SSBO {
    // The VkBuffer is only 64 bytes large
    // indexing from [0:63] is valid, rest is OOB
    uint data[128];
};

void main() {
    // will be OOB at runtime
    // will be discarded with robustBufferAccess
    data[96] = 0;

    // will return zero with robustBufferAccess
    uint x = data[127];
}

The [robustImageAccess](https://docs.vulkan.org/spec/latest/chapters/features.html#features-robustImageAccess) feature in [VK_EXT_image_robustness](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_image_robustness.html) enables out-of-bounds checking against the dimensions of the image view being accessed. If there is an out-of-bounds access to any image it will return `(0, 0, 0, 0)` or `(0, 0, 0, 1)`.

The `robustImageAccess` feature provides no guarantees about the values returned for access to an invalid LOD, it is still undefined behavior.

|  | Important
| --- | --- |

VK_EXT_robustness2 works the same way. |

Some applications, such as those being ported from other APIs such as D3D12, require stricter guarantees than `robustBufferAccess` and `robustImageAccess` provide. The [VK_KHR_robustness2](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_KHR_robustness2.html) extension adds this by exposing 3 new robustness features, described in the following sections. For some implementations these extra guarantees can come at a performance cost. Applications that don’t need the extra robustness are recommended to use `robustBufferAccess` and/or `robustImageAccess` instead where possible.

The [robustBufferAccess2](https://docs.vulkan.org/spec/latest/chapters/features.html#features-robustBufferAccess2) feature can be seen as a superset of `robustBufferAccess`.

With the feature enabled, it prevents all out-of-bounds writes and atomic from modifying any memory backing buffers. The `robustBufferAccess2` feature also enforces the values that must be returned for the various types of buffers when accessed out-of-bounds as [described in the spec](https://docs.vulkan.org/spec/latest/chapters/features.html#features-robustBufferAccess).

It is important to query the `robustUniformBufferAccessSizeAlignment` and `robustStorageBufferAccessSizeAlignment` from [VkPhysicalDeviceRobustness2PropertiesEXT](https://registry.khronos.org/vulkan/specs/latest/man/html/VkPhysicalDeviceRobustness2PropertiesEXT.html) as the alignment of where buffers are bound-checked is different between implementations.

The [robustImageAccess2](https://docs.vulkan.org/spec/latest/chapters/features.html#features-robustImageAccess2) feature can be seen as a superset of `robustImageAccess`. It builds on the out-of-bounds checking against the dimensions of the image view being accessed, adding stricter requirements on which values may be returned.

With `robustImageAccess2` an out-of-bounds access to an R, RG, or RGB format will return `(0, 0, 0, 1)`. For an RGBA format, such as `VK_FORMAT_R8G8B8A8_UNORM`, it will return `(0, 0, 0, 0)`.

For the case of accessing an image LOD outside the supported range, with `robustImageAccess2` enabled, it will be considered out of bounds.

Without the [nullDescriptor](https://docs.vulkan.org/spec/latest/chapters/features.html#features-nullDescriptor) feature enabled, when updating a `VkDescriptorSet`, all the resources backing it must be non-null, even if the descriptor is statically not used by the shader. This feature allows descriptors to be backed by null resources or views. Loads from a null descriptor return zero values and stores and atomics to a null descriptor are discarded.

The `nullDescriptor` feature also allows accesses to vertex input bindings where `vkCmdBindVertexBuffers::pBuffers` is null.

Because robustness can come at a performance cost for some implementations, the [VK_EXT_pipeline_robustness](https://registry.khronos.org/vulkan/specs/latest/man/html/VK_EXT_pipeline_robustness.html) extension was added to allow developers to request robustness only where needed.

At `VkPipeline` creation time one or more `VkPipelineRobustnessCreateInfoEXT` structures can be passed to specify the desired robustness behavior of accesses to buffer, image, and vertex input resources, either for the pipeline as a whole or on a per-pipeline-stage basis.

This extension also provides `VkPhysicalDevicePipelineRobustnessPropertiesEXT` which queries the implementation for what behavior it provides as default when no robustness features are enabled.

If dealing with the update after bind functionality found in `VK_EXT_descriptor_indexing` (which is core as of Vulkan 1.2) it is important to be aware of the [robustBufferAccessUpdateAfterBind](https://docs.vulkan.org/spec/latest/chapters/limits.html#limits-robustBufferAccessUpdateAfterBind) which indicates if an implementation can support both `robustBufferAccess` and the ability to update the descriptor after binding it.
