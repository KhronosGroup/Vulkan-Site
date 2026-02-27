// Copyright 2025 Holochip Inc
// SPDX-License-Identifier: MIT

// Based on hlsl.js structure
// Slang language definition for highlight.js

/*
Language: Slang
Description: Slang shading language
Author: Generated based on Slang specification
Website: https://shader-slang.org/
Category: graphics
*/

module.exports = function (hljs) {
  // 0x..., 0..., decimal, float, half, double
  const SLANG_NUMBER_RE = '(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?([hHfFlL]?)|\\.\\d+)([eE][-+]?\\d+)?([hHfFlL]?))'

  const SLANG_NUMBER_MODE = {
    className: 'number',
    begin: SLANG_NUMBER_RE,
    relevance: 0,
  }

  const matrixBases =
    'bool int uint float double half ' +
    'int8_t int16_t int32_t int64_t uint8_t uint16_t uint32_t uint64_t'

  const matrixSuffixes = [
    '',
    '1', '2', '3', '4',
    '1x1', '1x2', '1x3', '1x4',
    '2x1', '2x2', '2x3', '2x4',
    '3x1', '3x2', '3x3', '3x4',
    '4x1', '4x2', '4x3', '4x4']

  const matrixTypes = []

  for (const base of matrixBases.split(' ')) {
    for (const suffix of matrixSuffixes) {
      matrixTypes.push(base + suffix)
    }
  }

  const semanticsSV =
    'SV_Position SV_Target SV_Depth SV_Coverage SV_DispatchThreadID SV_GroupID SV_GroupIndex ' +
    'SV_GroupThreadID SV_InstanceID SV_PrimitiveID SV_RenderTargetArrayIndex SV_SampleIndex ' +
    'SV_VertexID SV_ViewportArrayIndex SV_DomainLocation SV_GSInstanceID SV_InnerCoverage ' +
    'SV_InsideTessFactor SV_IsFrontFace SV_OutputControlPointID SV_StencilRef SV_TessFactor'

  const semanticsNum =
    'POSITION NORMAL TEXCOORD COLOR TANGENT BINORMAL BLENDWEIGHT BLENDINDICES PSIZE TESSFACTOR ' +
    'SV_ClipDistance SV_CullDistance SV_Target'

  const semanticsTypes = semanticsNum.split(' ')

  for (const s of semanticsNum.split(' ')) {
    for (const n of Array(16).keys()) {
      semanticsTypes.push(s + n.toString())
    }
  }

  return {
    name: 'Slang',
    keywords: {
      keyword:
        'break case catch class const continue default do else enum export extern false for ' +
        'if import in inout interface namespace new null out private protected public return ' +
        'static struct switch this throw true try typedef uniform using var void while ' +
        'associatedtype extension func init let mutating override required subscript typealias ' +
        'cbuffer tbuffer groupshared precise nointerpolation linear centroid noperspective sample ' +
        'packoffset register row_major column_major unorm snorm ' +
        'vertex fragment geometry hull domain compute raygeneration intersection anyhit closesthit miss callable ' +
        'shader stage target profile version',

      type:
        // Data Types
        matrixTypes.join(' ') + ' ' +
        'vector matrix string ' +
        'Texture1D Texture1DArray Texture2D Texture2DArray Texture2DMS Texture2DMSArray Texture3D ' +
        'TextureCube TextureCubeArray RWTexture1D RWTexture1DArray RWTexture2D RWTexture2DArray RWTexture3D ' +
        'Buffer RWBuffer ByteAddressBuffer RWByteAddressBuffer StructuredBuffer RWStructuredBuffer ' +
        'AppendStructuredBuffer ConsumeStructuredBuffer ' +
        'SamplerState SamplerComparisonState ' +
        'RasterizerState BlendState DepthStencilState ' +
        'InputPatch OutputPatch PointStream LineStream TriangleStream ' +
        'RenderTargetView DepthStencilView',

      built_in:
        // Semantics
        'POSITIONT FOG PSIZE VFACE VPOS ' +
        semanticsTypes.join(' ') + ' ' +
        semanticsSV + ' ' +
        semanticsSV.toUpperCase() + ' ' +

        // Built-in Functions
        'abs acos all any asin atan atan2 ceil clamp cos cosh cross degrees determinant distance dot ' +
        'exp exp2 faceforward floor fmod frac length lerp log log2 max min normalize pow radians ' +
        'reflect refract round rsqrt saturate sign sin sinh smoothstep sqrt step tan tanh transpose ' +
        'ddx ddy fwidth ' +
        'tex1D tex2D tex3D texCUBE sample load gather ' +
        'mul mad lit dst noise ' +
        'AllMemoryBarrier AllMemoryBarrierWithGroupSync DeviceMemoryBarrier DeviceMemoryBarrierWithGroupSync ' +
        'GroupMemoryBarrier GroupMemoryBarrierWithGroupSync ' +
        'InterlockedAdd InterlockedAnd InterlockedCompareExchange InterlockedCompareStore InterlockedExchange ' +
        'InterlockedMax InterlockedMin InterlockedOr InterlockedXor ' +
        'countbits firstbithigh firstbitlow reversebits ' +
        'asdouble asfloat asint asuint f16tof32 f32tof16 ' +
        'isfinite isinf isnan ' +
        'ldexp frexp modf ' +
        'printf errorf abort',

      literal: 'true false null',
    },
    illegal: '"',
    contains: [
      hljs.C_LINE_COMMENT_MODE,
      hljs.C_BLOCK_COMMENT_MODE,
      SLANG_NUMBER_MODE,
      {
        className: 'string',
        begin: '"',
        end: '"',
        contains: [hljs.BACKSLASH_ESCAPE],
      },
      {
        className: 'meta',
        begin: '#',
        end: '$',
      },
      {
        className: 'meta',
        begin: '\\[',
        end: '\\]',
      },
    ],
  }
}
