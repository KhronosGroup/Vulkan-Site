# VK_NV_clip_space_w_scaling(3)

## Metadata

- **Component**: refpages
- **Version**: latest
- **URL**: /refpages/latest/refpages/source/VK_NV_clip_space_w_scaling.html

## Table of Contents

- [Name](#_name)
- [VK_NV_clip_space_w_scaling](#VK_NV_clip_space_w_scaling)
- [Other Extension Metadata](#_other_extension_metadata)
- [Other_Extension_Metadata](#_other_extension_metadata)
- [Description](#_description)
- [New Commands](#_new_commands)
- [New Structures](#_new_structures)
- [New Enum Constants](#_new_enum_constants)
- [New_Enum_Constants](#_new_enum_constants)
- [Issues](#_issues)
- [Examples](#_examples)
- [Version History](#_version_history)
- [See Also](#_see_also)
- [Document Notes](#_document_notes)

## Content

VK_NV_clip_space_w_scaling - device extension

**Name String**

`VK_NV_clip_space_w_scaling`

**Extension Type**

Device extension

**Registered Extension Number**

88

**Revision**

1

**Ratification Status**

Not ratified

**Extension and Version Dependencies**

None

**Contact**

* 
Eric Werness [ewerness-nv](https://github.com/KhronosGroup/Vulkan-Docs/issues/new?body=[VK_NV_clip_space_w_scaling] @ewerness-nv%0A*Here describe the issue or question you have about the VK_NV_clip_space_w_scaling extension*)

**Last Modified Date**

2017-02-15

**Contributors**

* 
Eric Werness, NVIDIA

* 
Kedarnath Thangudu, NVIDIA

Virtual Reality (VR) applications often involve a post-processing step to
apply a “barrel” distortion to the rendered image to correct the
“pincushion” distortion introduced by the optics in a VR device.
The barrel distorted image has lower resolution along the edges compared to
the center.
Since the original image is rendered at high resolution, which is uniform
across the complete image, a lot of pixels towards the edges do not make it
to the final post-processed image.

This extension provides a mechanism to render VR scenes at a non-uniform
resolution, in particular a resolution that falls linearly from the center
towards the edges.
This is achieved by scaling the w coordinate of the vertices in the
clip space before perspective divide.
The clip space w coordinate of the vertices **can** be offset as of a
function of x and y coordinates as follows:

w' = w +  Ax +  By

In the intended use case for viewport position scaling, an application
should use a set of four viewports, one for each of the four quadrants of a
Cartesian coordinate system.
Each viewport is set to the dimension of the image, but is scissored to the
quadrant it represents.
The application should specify A and B coefficients of the
w-scaling equation above, that have the same value, but different
signs, for each of the viewports.
The signs of A and B should match the signs of x and
y for the quadrant that they represent such that the value of w'
will always be greater than or equal to the original w value for the
entire image.
Since the offset to w, (Ax +  By), is always positive, and
increases with the absolute values of x and y, the effective
resolution will fall off linearly from the center of the image to its edges.

* 
[vkCmdSetViewportWScalingNV](vkCmdSetViewportWScalingNV.html)

* 
[VkViewportWScalingNV](VkViewportWScalingNV.html)

* 
Extending [VkPipelineViewportStateCreateInfo](VkPipelineViewportStateCreateInfo.html):

[VkPipelineViewportWScalingStateCreateInfoNV](VkPipelineViewportWScalingStateCreateInfoNV.html)

* 
`VK_NV_CLIP_SPACE_W_SCALING_EXTENSION_NAME`

* 
`VK_NV_CLIP_SPACE_W_SCALING_SPEC_VERSION`

* 
Extending [VkDynamicState](VkDynamicState.html):

[VK_DYNAMIC_STATE_VIEWPORT_W_SCALING_NV](VkDynamicState.html)

Extending [VkStructureType](VkStructureType.html):

* 
[VK_STRUCTURE_TYPE_PIPELINE_VIEWPORT_W_SCALING_STATE_CREATE_INFO_NV](VkStructureType.html)

1) Is the pipeline structure name too long?

**RESOLVED**: It fits with the naming convention.

2) Separate W scaling section or fold into coordinate transformations?

**RESOLVED**: Leaving it as its own section for now.

VkViewport viewports[4];
VkRect2D scissors[4];
VkViewportWScalingNV scalings[4];

for (int i = 0; i 

Example shader to read from a w-scaled texture:

// Vertex Shader
// Draw a triangle that covers the whole screen
const vec4 positions[3] = vec4[3](vec4(-1, -1, 0, 1),
                                  vec4( 3, -1, 0, 1),
                                  vec4(-1,  3, 0, 1));
out vec2 uv;
void main()
{
    vec4 pos = positions[ gl_VertexID ];
    gl_Position = pos;
    uv = pos.xy;
}

// Fragment Shader
uniform sampler2D tex;
uniform float xcoeff;
uniform float ycoeff;
out vec4 Color;
in vec2 uv;

void main()
{
    // Handle uv as if upper right quadrant
    vec2 uvabs = abs(uv);

    // unscale: transform w-scaled image into an unscaled image
    //   scale: transform unscaled image int a w-scaled image
    float unscale = 1.0 / (1 + xcoeff * uvabs.x + xcoeff * uvabs.y);
    //float scale = 1.0 / (1 - xcoeff * uvabs.x - xcoeff * uvabs.y);

    vec2 P = vec2(unscale * uvabs.x, unscale * uvabs.y);

    // Go back to the right quadrant
    P *= sign(uv);

    Color = texture(tex, P * 0.5 + 0.5);
}

* 
Revision 1, 2017-02-15 (Eric Werness)

Internal revisions

No cross-references are available

For more information, see the [Vulkan Specification](../../../../spec/latest/appendices/extensions.html#VK_NV_clip_space_w_scaling).

This page is a generated document.
Fixes and changes should be made to the generator scripts, not directly.
