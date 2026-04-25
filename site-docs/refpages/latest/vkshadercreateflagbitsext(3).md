# VkShaderCreateFlagBitsEXT(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VkShaderCreateFlagBitsEXT.html

## Table of Contents

- [Name](#_name)
- [C Specification](#_c_specification)
- [Description](#_description)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VkShaderCreateFlagBitsEXT - Bitmask controlling how a shader object is created

Possible values of the `flags` member of [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html)
specifying how a shader object is created, are:

// Provided by VK_EXT_shader_object
typedef enum VkShaderCreateFlagBitsEXT {
    VK_SHADER_CREATE_LINK_STAGE_BIT_EXT = 0x00000001,
  // Provided by VK_EXT_descriptor_heap with VK_EXT_shader_object
    VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT = 0x00000400,
  // Provided by VK_KHR_maintenance5 with VK_ARM_shader_instrumentation, VK_EXT_shader_object with VK_ARM_shader_instrumentation
    VK_SHADER_CREATE_INSTRUMENT_SHADER_BIT_ARM = 0x00000800,
  // Provided by VK_EXT_shader_object with VK_EXT_subgroup_size_control or VK_VERSION_1_3
    VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT = 0x00000002,
  // Provided by VK_EXT_shader_object with VK_EXT_subgroup_size_control or VK_VERSION_1_3
    VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT = 0x00000004,
  // Provided by VK_EXT_shader_object with VK_EXT_mesh_shader or VK_NV_mesh_shader
    VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT = 0x00000008,
  // Provided by VK_EXT_shader_object with VK_KHR_device_group or VK_VERSION_1_1
    VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT = 0x00000010,
  // Provided by VK_KHR_fragment_shading_rate with VK_EXT_shader_object
    VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT = 0x00000020,
  // Provided by VK_EXT_fragment_density_map with VK_EXT_shader_object
    VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT = 0x00000040,
  // Provided by VK_EXT_device_generated_commands
    VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT = 0x00000080,
  // Provided by VK_EXT_shader_64bit_indexing
    VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT = 0x00008000,
} VkShaderCreateFlagBitsEXT;

* 
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#) specifies that a shader is
linked to all other shaders created in the same [vkCreateShadersEXT](vkCreateShadersEXT.html)
call whose [VkShaderCreateInfoEXT](VkShaderCreateInfoEXT.html) structures' `flags` include
[VK_SHADER_CREATE_LINK_STAGE_BIT_EXT](#).

* 
[VK_SHADER_CREATE_ALLOW_VARYING_SUBGROUP_SIZE_BIT_EXT](#) specifies
    that the [`SubgroupSize`](../../../../spec/latest/chapters/interfaces.html#interfaces-builtin-variables-sgs) **may**
    vary in a
task, mesh, or
    compute shader.

* 
[VK_SHADER_CREATE_REQUIRE_FULL_SUBGROUPS_BIT_EXT](#) specifies that the
    subgroup sizes **must** be launched with all invocations active in a
task, mesh, or
    compute shader.

* 
[VK_SHADER_CREATE_NO_TASK_SHADER_BIT_EXT](#) specifies that a mesh
shader **must** only be used without a task shader.
Otherwise, the mesh shader **must** only be used with a task shader.

* 
[VK_SHADER_CREATE_DISPATCH_BASE_BIT_EXT](#) specifies that a compute
shader **can** be used with [vkCmdDispatchBase](vkCmdDispatchBase.html) with a non-zero base
workgroup.

* 
[VK_SHADER_CREATE_FRAGMENT_SHADING_RATE_ATTACHMENT_BIT_EXT](#)
specifies that a fragment shader **can** be used with a fragment shading
rate attachment.

* 
[VK_SHADER_CREATE_FRAGMENT_DENSITY_MAP_ATTACHMENT_BIT_EXT](#) specifies
that a fragment shader **can** be used with a fragment density map
attachment.

* 
[VK_SHADER_CREATE_INDIRECT_BINDABLE_BIT_EXT](#) specifies that the
shader **can** be used in combination with [Device-Generated Commands](../../../../spec/latest/chapters/device_generated_commands/generatedcommands.html#device-generated-commands).

* 
[VK_SHADER_CREATE_64_BIT_INDEXING_BIT_EXT](#) specifies that the shader
enables [64-bit indexing](../../../../spec/latest/appendices/spirvenv.html#spirvenv-64bindexing).

* 
[VK_SHADER_CREATE_DESCRIPTOR_HEAP_BIT_EXT](#) specifies that the shader
will use descriptor heap mappings instead of descriptor set layouts.

[VK_EXT_shader_object](VK_EXT_shader_object.html), [VkShaderCreateFlagsEXT](VkShaderCreateFlagsEXT.html)

For more information, see the [Vulkan Specification](../../../../spec/latest/chapters/shaders.html#VkShaderCreateFlagBitsEXT).

This page is extracted from the Vulkan Specification.
Fixes and changes should be made to the Specification, not directly.
