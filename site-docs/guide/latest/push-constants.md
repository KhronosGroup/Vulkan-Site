# Push Constants

## Metadata

- **Component**: guide
- **Version**: latest
- **URL**: /guide/latest/push_constants.html

## Table of Contents

- [How to use](#pc-how-to-us)
- [How_to_use](#pc-how-to-us)
- [Shader Code](#pc-shader-code)
- [Pipeline layout](#pc-pipeline-layout)
- [Updating at record time](#pc-updating)
- [Updating_at_record_time](#pc-updating)
- [Offsets](#pc-offsets)
- [Pipeline layout compatibility](#pc-pipeline-layout-compatibility)
- [Pipeline_layout_compatibility](#pc-pipeline-layout-compatibility)
- [Lifetime of push constants](#pc-lifetime)
- [Lifetime_of_push_constants](#pc-lifetime)
- [Binding descriptor sets has no effect](#pc-binding-descriptor-sets)
- [Binding_descriptor_sets_has_no_effect](#pc-binding-descriptor-sets)
- [Mixing bind points](#pc-mixing-bind-points)
- [Mixing_bind_points](#pc-mixing-bind-points)
- [Binding non-compatible pipelines](#pc-binding-non-compatible)
- [Binding_non-compatible_pipelines](#pc-binding-non-compatible)
- [Layouts with no static push constants](#pc-layout-without)
- [Layouts_with_no_static_push_constants](#pc-layout-without)
- [Updated incrementally](#pc-updated-incrementally)

## Content

The Vulkan spec defines `Push Constants` as:

|  | A small bank of values writable via the API and accessible in shaders. Push constants allow the application to set values used in shaders without creating buffers or modifying and binding descriptor sets for each update. |
| --- | --- |

* 
[How to use](#pc-how-to-us)

[Shader Code](#pc-shader-code)

* 
[Pipeline layout](#pc-pipeline-layout)

* 
[Updating at record time](#pc-updating)

* 
[Offsets](#pc-offsets)

[Pipeline layout compatibility](#pc-pipeline-layout-compatibility)

[Lifetime of push constants](#pc-lifetime)

* 
[Binding descriptor sets has no effect](#pc-binding-descriptor-sets)

* 
[Mixing bind points](#pc-mixing-bind-points)

* 
[Binding non-compatible pipelines](#pc-binding-non-compatible)

* 
[Layouts with no static push constants](#pc-layout-without)

* 
[Updated incrementally](#pc-updated-incrementally)

From a shader perspective, push constant are similar to a uniform buffer. The spec provides details for the [push constant interface](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-resources-pushconst) between Vulkan and SPIR-V.

A simple GLSL fragment shader example ([Try Online](https://godbolt.org/z/93WaYd8dE)):

layout(push_constant, std430) uniform pc {
    vec4 data;
};

layout(location = 0) out vec4 outColor;

void main() {
   outColor = data;
}

Which when looking at parts of the disassembled SPIR-V

                  OpMemberDecorate %pc 0 Offset 0
                  OpDecorate %pc Block

         %float = OpTypeFloat 32
       %v4float = OpTypeVector %float 4

%pc             = OpTypeStruct %v4float
%pc_ptr         = OpTypePointer PushConstant %pc
%pc_var         = OpVariable %pc_ptr PushConstant
%pc_v4float_ptr = OpTypePointer PushConstant %v4float

%access_chain   = OpAccessChain %pc_v4float_ptr %pc_var %int_0

it matches the [Vulkan spec](https://docs.vulkan.org/spec/latest/chapters/interfaces.html#interfaces-resources-pushconst) description of being an `OpTypeStruct` type with a `Block` decoration.

When calling `vkCreatePipelineLayout` the [push constant ranges](https://www.khronos.org/registry/vulkan/specs/latest/man/html/VkPushConstantRange.html) needs to be set in [VkPipelineLayoutCreateInfo](https://www.khronos.org/registry/vulkan/specs/latest/man/html/VkPipelineLayoutCreateInfo.html).

An example using the previous shader above:

VkPushConstantRange range = {};
range.stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT;
range.offset = 0;
range.size = 16; // %v4float (vec4) is defined as 16 bytes

VkPipelineLayoutCreateInfo create_info = {};
create_info.sType = VK_STRUCTURE_TYPE_PIPELINE_LAYOUT_CREATE_INFO;
create_info.pNext = NULL;
create_info.flags = 0;
create_info.setLayoutCount = 0;
create_info.pushConstantRangeCount = 1;
create_info.pPushConstantRanges = &range;

VkPipelineLayout pipeline_layout;
vkCreatePipelineLayout(device, &create_info, NULL, &pipeline_layout);

Lastly, the value for the push constants needs to be updated to the desired value using [vkCmdPushConstants](https://www.khronos.org/registry/vulkan/specs/latest/man/html/vkCmdPushConstants.html).

float data[4] = {0.0f, 1.0f, 2.0f, 3.0f}; // where sizeof(float) == 4 bytes

// vkBeginCommandBuffer()
uint32_t offset = 0;
uint32_t size = 16;
vkCmdPushConstants(commandBuffer, pipeline_layout, VK_SHADER_STAGE_FRAGMENT_BIT, offset, size, data);
// draw / dispatch / trace rays / etc
// vkEndCommandBuffer()

Taking the above shader, a developer can add an offset to the push constant block

layout(push_constant, std430) uniform pc {
-   vec4 data;
+   layout(offset = 32) vec4 data;
};

layout(location = 0) out vec4 outColor;

void main() {
   outColor = data;
}

The difference from the above disassembled SPIR-V is only the member decoration

- OpMemberDecorate %pc 0 Offset 0
+ OpMemberDecorate %pc 0 Offset 32

From here the offset of `32` needs to be also specified in `VkPushConstantRange` for each shader stage that uses it

VkPushConstantRange range = {};
range.stageFlags = VK_SHADER_STAGE_FRAGMENT_BIT;
-range.offset = 0;
+range.offset = 32;
range.size = 16;

The following diagram provides a visualization of how push constant offsets work.

![push_constant_offset](_images/push_constant_offset.png)

The Vulkan spec defines what [Compatibility for push constants](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-compatibility) as

|  | if they were created with identical push constant ranges |
| --- | --- |

This means before a [bound pipeline command is issued](https://docs.vulkan.org/spec/latest/chapters/pipelines.html#pipelines-bindpoint-commands) (`vkCmdDraw`, `vkCmdDispatch`, etc) the `VkPipelineLayout` used in the last `vkCmdPushConstants` and `vkCmdBindPipeline` (for the appropriate `VkPipelineBindPoint`) must have had **identical** `VkPushConstantRange`.

The lifetime of push constants can open room for some [edge](https://github.com/KhronosGroup/Vulkan-Docs/issues/1081) [cases](https://github.com/KhronosGroup/Vulkan-Docs/issues/1485) and the following is designed to give some common examples of what is and is not valid with push constants.

|  | There are some CTS under `dEQP-VK.pipeline.push_constant.lifetime.*` |
| --- | --- |

Because push constants are not tied to descriptors, the use of `vkCmdBindDescriptorSets` has no effect on the lifetime or [pipeline layout compatibility](https://docs.vulkan.org/spec/latest/chapters/descriptorsets.html#descriptorsets-compatibility) of push constants.

It is possible to use two different `VkPipelineBindPoint` that each have different uses of push constants in their shader

// different ranges and therefore not compatible layouts
VkPipelineLayout layout_graphics; // VK_SHADER_STAGE_FRAGMENT_BIT
VkPipelineLayout layout_compute;  // VK_SHADER_STAGE_COMPUTE_BIT

// vkBeginCommandBuffer()
vkCmdBindPipeline(pipeline_graphics); // layout_graphics
vkCmdBindPipeline(pipeline_compute);  // layout_compute

vkCmdPushConstants(layout_graphics); // VK_SHADER_STAGE_FRAGMENT_BIT
// Still valid as the last pipeline and push constant for graphics are compatible
vkCmdDraw();

vkCmdPushConstants(layout_compute); // VK_SHADER_STAGE_COMPUTE_BIT
vkCmdDispatch(); // valid
// vkEndCommandBuffer()

The spec say:

|  | Binding a pipeline with a layout that is not compatible with the push constant layout does not disturb the push constant values. |
| --- | --- |

The following examples helps illustrate this:

// vkBeginCommandBuffer()
vkCmdPushConstants(layout_0);
vkCmdBindPipeline(pipeline_b); // non-compatible with layout_0
vkCmdBindPipeline(pipeline_a); // compatible with layout_0
vkCmdDraw(); // valid
// vkEndCommandBuffer()

// vkBeginCommandBuffer()
vkCmdBindPipeline(pipeline_b); // non-compatible with layout_0
vkCmdPushConstants(layout_0);
vkCmdBindPipeline(pipeline_a); // compatible with layout_0
vkCmdDraw(); // valid
// vkEndCommandBuffer()

// vkBeginCommandBuffer()
vkCmdPushConstants(layout_0);
vkCmdBindPipeline(pipeline_a); // compatible with layout_0
vkCmdBindPipeline(pipeline_b); // non-compatible with layout_0
vkCmdDraw(); // INVALID
// vkEndCommandBuffer()

It is also valid to have a `VkPushConstantRange` in the pipeline layout but no push constants in the shader, for example:

VkPushConstantRange range = {VK_SHADER_STAGE_VERTEX_BIT, 0, 4};
VkPipelineLayoutCreateInfo pipeline_layout_info = {VK_SHADER_STAGE_VERTEX_BIT. 1, &range};

void main() {
   gl_Position = vec4(1.0);
}

If a `VkPipeline` is created with the above shader and pipeline layout, it is **still valid** to call `vkCmdPushConstants` on it.

The mental model can be thought of as `vkCmdPushConstants` is tied to the `VkPipelineLayout` usage and therefore why they must match before a call to a command such as `vkCmdDraw()`.

The same way it is possible to bind descriptor sets that are never used by the shader, the same is true for push constants.

Push constants can be incrementally updated over the course of a command buffer.

The following shows an example of the values of a `vec4` push constant

// vkBeginCommandBuffer()
vkCmdBindPipeline();
vkCmdPushConstants(offset: 0, size: 16, value = [0, 0, 0, 0]);
vkCmdDraw(); // values = [0, 0, 0, 0]

vkCmdPushConstants(offset: 4, size: 8, value = [1 ,1]);
vkCmdDraw(); // values = [0, 1, 1, 0]

vkCmdPushConstants(offset: 8, size: 8, value = [2, 2]);
vkCmdDraw(); // values = [0, 1, 2, 2]
// vkEndCommandBuffer()
