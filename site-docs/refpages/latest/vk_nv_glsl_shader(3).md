# VK_NV_glsl_shader(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_glsl_shader.html

## Table of Contents

- [Name](#_name)
- [VK_NV_glsl_shader](#VK_NV_glsl_shader)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [Deprecation](#_deprecation)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_glsl_shader - device extension

**Name String**

`VK_NV_glsl_shader`

**Extension Type**

Device extension

**Registered Extension Number**

13

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Deprecation State**

* 
*Deprecated* without replacement

**Contact**

* 
Piers Daniell [pdaniell-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_glsl_shader] @pdaniell-nv%0A*Here describe the issue or question you have about the VK_NV_glsl_shader extension*)

**Last Modified Date**

2016-02-14

**IP Status**

No known IP claims.

**Contributors**

* 
Piers Daniell, NVIDIA

This extension allows GLSL shaders written to the `GL_KHR_vulkan_glsl`
extension specification to be used instead of SPIR-V.
The implementation will automatically detect whether the shader is SPIR-V or
GLSL, and compile it appropriately.

Functionality in this extension is outside of the scope of Vulkan and is
better served by a compiler library such as
[glslang](https://github.com/KhronosGroup/glslang).
No new implementations will support this extension, so applications **should**
not use it.

* 
`VK_NV_GLSL_SHADER_EXTENSION_NAME`

* 
`VK_NV_GLSL_SHADER_SPEC_VERSION`

* 
Extending [VkResult](VkResult.html):

[VK_ERROR_INVALID_SHADER_NV](VkResult.html)

**Example 1**

Passing in GLSL code

    char const vss[] =
        "#version 450 core\n"
        "layout(location = 0) in vec2 aVertex;\n"
        "layout(location = 1) in vec4 aColor;\n"
        "out vec4 vColor;\n"
        "void main()\n"
        "{\n"
        "    vColor = aColor;\n"
        "    gl_Position = vec4(aVertex, 0, 1);\n"
        "}\n"
    ;
    VkShaderModuleCreateInfo vertexShaderInfo = { VK_STRUCTURE_TYPE_SHADER_MODULE_CREATE_INFO };
    vertexShaderInfo.codeSize = sizeof vss;
    vertexShaderInfo.pCode = vss;
    VkShaderModule vertexShader;
    vkCreateShaderModule(device, &vertexShaderInfo, 0, &vertexShader);

* 
Revision 1, 2016-02-14 (Piers Daniell)

Initial draft

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_glsl_shader).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
